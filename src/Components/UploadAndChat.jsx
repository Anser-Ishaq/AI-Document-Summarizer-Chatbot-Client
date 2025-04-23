import React, { useState } from "react";
import useAuthStore from "../Store/authStore";
import useModalStore from "../Store/modalStore";
import { uploadDocument, startChat } from "../api/documentsApi";
import useChatStore from "../Store/chatStore";
import FileUpload from "./Chatbot/FileUpload";
const UploadAndChat = () => {
    const { setDocId, setChatId } = useChatStore();
    const { user } = useAuthStore();
    const { closeModal } = useModalStore();

    const [documentId, setDocumentId] = useState(null);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !user?.id) return;

        setLoading(true);
        try {
            const data = await uploadDocument(user.id, file);
            setDocumentId(data.data.id);
            setDocId(data.data.id);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Document upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleStartChat = async () => {
        if (!title || !documentId || !user?.id) return;

        setLoading(true);
        try {
            const res = await startChat(user.id, documentId, title);
            console.log("data from start chat", res)
            alert("Chat started successfully");
            setChatId(res.data.id);
            closeModal();
        } catch (err) {
            console.error("Failed to start chat", err);
            alert("Failed to start chat");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div style={{ flexDirection: "column" }} className="flex flex-col gap-3">
            {!documentId ? (
                <>
                    <label>Upload Document</label>
                    {/* <input type="file" onChange={handleFileUpload} />
                    {loading && <p>Uploading...</p>} */}
                    <FileUpload handleFileUpload={handleFileUpload} loading={loading} />
                </>
            ) : (
                <>
                    <label>Enter Document Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        placeholder="e.g., Summarize my document"
                    />
                    <button
                        onClick={handleStartChat}
                        className="btn btn-primary mt-2"
                        disabled={loading}
                    >
                        {loading ? "Starting..." : "Start Chat"}
                    </button>
                </>
            )}
        </div>
    );
};

export default UploadAndChat;
