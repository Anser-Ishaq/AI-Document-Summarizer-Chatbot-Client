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

    // Form state - separate from the persisted data
    const [currentDocId, setCurrentDocId] = useState(null);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [formStep, setFormStep] = useState("upload"); // "upload" or "title"

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !user?.id) return;

        setLoading(true);
        try {
            const data = await uploadDocument(user.id, file);
            // Set both the current document ID for the form
            // and the persisted document ID in the store
            setCurrentDocId(data.data.id);
            setDocId(data.data.id);
            setFormStep("title"); // Move to the title step
        } catch (err) {
            console.error("Upload failed", err);
            alert("Document upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleStartChat = async () => {
        if (!title || !currentDocId || !user?.id) return;

        setLoading(true);
        try {
            const res = await startChat(user.id, currentDocId, title);
            console.log("data from start chat", res);
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

    // Reset only the form state when starting a new upload
    const handleNewUpload = () => {
        setFormStep("upload");
        // Don't clear the document ID in localStorage/store
    };

    return (
        <div style={{flexDirection:"column"}} className="flex flex-col gap-3">
            {formStep === "upload" ? (
                <>
                    <label>Upload Document</label>
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
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleStartChat}
                            className="btn btn-primary"
                            disabled={loading || !title}
                        >
                            {loading ? "Starting..." : "Start Chat"}
                        </button>
                        <button
                            onClick={handleNewUpload}
                            className="btn btn-secondary"
                            disabled={loading}
                        >
                            Upload Different Document
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UploadAndChat;