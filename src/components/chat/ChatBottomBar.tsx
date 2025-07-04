import { AnimatePresence, motion } from "framer-motion"
import { ImageIcon, Loader, SendHorizonalIcon, ThumbsUp } from "lucide-react"
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import { Button } from "../ui/button";
import useSound from "use-sound";
import { usePreferences } from "@/store/usePreferences";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessageAction } from "@/actions/message.actions";
import { useSelectedUser } from "@/store/useSelectedUser";
import { CloudinaryUploadWidgetInfo, CldUploadWidget as CloudUploadWidget } from 'next-cloudinary';
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "../ui/dialog";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { pusherClient } from "@/lib/pusher";
import { Message } from "@/db/dummy";


const ChatBottomBar = () => {


    const [keyName] = useState(() => Math.random().toString(36).substring(2, 9));
    const [message, setMessage] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const { selectedUser } = useSelectedUser()
    const { user: currentUser } = useKindeBrowserClient();

    const { soundEnabled } = usePreferences();
    const queryClient = useQueryClient();

    const [imgUrl, setImgUrl] = useState(null as string | null);

    const [playSound1] = useSound("/sounds/keystroke1.mp3");
    const [playSound2] = useSound("/sounds/keystroke2.mp3");
    const [playSound3] = useSound("/sounds/keystroke3.mp3");
    const [playSound4] = useSound("/sounds/keystroke4.mp3");

    const [playNotificationSound] = useSound("/sounds/notification.mp3");

    const playSoundFunctions = [playSound1, playSound2, playSound3, playSound4];

    const playRandomKeyStrokeSound = () => {
        const randomIndex = Math.floor(Math.random() * playSoundFunctions.length)
        if (soundEnabled) {
            playSoundFunctions[randomIndex]();
        }
    };

    // const { mutate: sendMessage, isPending } = useMutation({
    //     mutationFn: sendMessageAction
    // })

    const { mutate: sendMessage, isPending } = useMutation({
        mutationFn: sendMessageAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages", selectedUser?.id] });
        }
    });

    const handleSendMessage = () => {
        if (!message.trim()) return;

        // sendMessage({
        //     content: message,
        //     messageType: "text",
        //     receiverId: selectedUser?.id || "text"
        // });
        sendMessage({
            content: message,
            messageType: "text",
            receiverId: selectedUser?.id || "text"
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["messages", selectedUser?.id] });
            }
        });
        setMessage("");

        textAreaRef.current?.focus();
    };


    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }

        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            setMessage(message + "\n");
        }
    };


    useEffect(() => {
        const channelName = `${currentUser?.id}__${selectedUser?.id}`.split("__").sort().join("__");
        const channel = pusherClient?.subscribe(channelName);

        const handleNewMessage = (data: { message: Message }) => {
            // queryClient.setQueryData(["messages", selectedUser?.id], (oldMessages: Message[]) => {
            //     return [...oldMessages, data.message];
            // });
            queryClient.setQueryData<Message[]>(["messages", selectedUser?.id], (oldMessages = []) => [
                ...oldMessages,
                data.message,
            ]);

            if (soundEnabled && data.message.senderId !== currentUser?.id) {
                playNotificationSound();
            }
        };

        channel.bind("newMessage", handleNewMessage);

        // ! Absolutely important, otherwise the event listener will be added multiple times which means you'll see the incoming new message multiple times
        return () => {
            channel.unbind("newMessage", handleNewMessage);
            pusherClient.unsubscribe(channelName);
        };
    }, [currentUser?.id, selectedUser?.id, queryClient, playNotificationSound, soundEnabled]);

    return <div className="p-2 flex justify-between w-full items-center gap-2" >
        {!message.trim() && (
            <CloudUploadWidget
                signatureEndpoint={"/api/sign-cloudinary-params"}
                onSuccess={(result, { widget }) => {
                    const imageUrl = (result.info as CloudinaryUploadWidgetInfo).secure_url;
                    setImgUrl(imageUrl)
                    widget.close()

                }}
            >
                {({ open }) => {
                    return (
                        <ImageIcon
                            onClick={() => open()}
                            size={20}
                            className="cursor-pointer text-muted-foreground"
                        >
                            Upload an Image
                        </ImageIcon>
                    );
                }}
            </CloudUploadWidget>
        )}

        <Dialog open={!!imgUrl}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Image Preview</DialogTitle>
                </DialogHeader>
                <div className='flex justify-center items-center relative h-96 w-full mx-auto'>
                    {imgUrl && (
                        <Image src={imgUrl} alt='Image Preview' fill className='object-contain' />
                    )}
                </div>

                <DialogFooter>
                    <Button
                        type='submit'
                        onClick={() => {
                            if (selectedUser?.id) {
                                sendMessage({ content: imgUrl!, messageType: "image", receiverId: selectedUser.id });
                            }
                            setImgUrl(null);
                        }}
                    >
                        Send
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <AnimatePresence>
            <motion.div
                key={keyName} // I have passed keyName as key explicitly to ensure it bypasses the key error from NextJS
                layout
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{
                    opacity: { duration: 0.5 },
                    layout: {
                        type: "spring",
                        bounce: 0.15,
                    },
                }}
                className='w-full relative'
            >
                <Textarea
                    autoComplete='off'
                    placeholder='Aa'
                    rows={1}
                    className='w-full border rounded-full flex items-center h-9 resize-none overflow-hidden	bg-background min-h-0'
                    value={message}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        playRandomKeyStrokeSound();
                    }}
                    ref={textAreaRef}
                />
                <div className="absolute right-2 bottom-0.5 " >
                    <EmojiPicker
                        onChange={(emoji) => {
                            setMessage((prev) => prev + emoji);
                            if (textAreaRef.current) {
                                textAreaRef.current.focus();
                            }
                        }}
                    />
                </div>
            </motion.div>
            {message.trim() ? (
                <Button
                    className="h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
                    variant={"ghost"}
                    size={"icon"}
                    onClick={handleSendMessage}
                >
                    <SendHorizonalIcon
                        size={20}
                        className="text-muted-foreground hover:text-foreground transition" />
                </Button>
            ) : (
                <Button
                    className='h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0'
                    variant={"ghost"}
                    size={"icon"}
                >
                    {!isPending && (
                        <ThumbsUp
                            size={20}
                            className='text-muted-foreground'
                            onClick={() => {
                                sendMessage({ content: "👍", messageType: "text", receiverId: selectedUser?.id ?? "text" });
                            }}
                        />
                    )}
                    {isPending && <Loader size={20} className='animate-spin' />}
                </Button>
            )}
        </AnimatePresence>
    </div>
}

export default ChatBottomBar