import React, { useState } from "react";
import useAuthStore from "../Store/authStore";
import useModalStore from "../Store/modalStore";
import { uploadDocument, startChat } from "../api/documentsApi";
import useChatStore from "../Store/chatStore";
import FileUpload from "./Chatbot/FileUpload";
import { useNavigate } from "react-router-dom";
import useAlert from "../Hooks/useAlerts";
const UploadAndChat = () => {
    const { setDocId, setChatId } = useChatStore();
    const { user } = useAuthStore();
    const { closeModal } = useModalStore();
    const navigate = useNavigate()
    const { showSuccess, showError } = useAlert()

    // Form state - separate from the persisted data
    const [currentDocId, setCurrentDocId] = useState(null);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [formStep, setFormStep] = useState("upload");

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !user?.id) return;

        const isPdf = file.type === "application/pdf";
        if (user.status === "free" && !isPdf) {
            showError("Free users can only upload PDF files.");
            return;
        }
        setLoading(true);
        try {
            const data = await uploadDocument(user.id, file);
            console.log("data from upload", data);
            // Set both the current document ID for the form
            // and the persisted document ID in the store
            setCurrentDocId(data.data.id);
            setDocId(data.data.id);
            setFormStep("title");
        } catch (err) {
            console.error("Upload failed", err);
            console.log("error in file upload", err)
            // showError(err.response.data.message)
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
            showSuccess("Chat started successfully")
            // alert("Chat started successfully");
            // setChatId(res.data.id);
            // navigate(`/chat/${res.data.id}`)
            // Set both values in localStorage first
            localStorage.setItem("documentId", currentDocId);
            localStorage.setItem("chatId", res.data.id);

            // Then update the store
            setDocId(currentDocId);
            setChatId(res.data.id);

            closeModal();

            // Navigate to the new chat with a small delay to ensure state updates
            setTimeout(() => {
                // navigate(`/chat/${res.data.id}`);
                // Optional: Force a reload 
                window.location.href = `/chat/${res.data.id}`;
            }, 100);
            closeModal();
        } catch (err) {
            console.error("Failed to start chat", err);
            // alert("Failed to start chat");
            showError("Failed to start chat")
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
        <div style={{ flexDirection: "column" }} className="flex flex-col gap-3">
            {formStep === "upload" ? (
                <>
                    <label>Upload Document</label>
                    <FileUpload handleFileUpload={handleFileUpload} loading={loading} />
                </>
            ) : (
                <>
                    <label>Enter Chat Title</label>
                    <input
                        style={{ border: "2px solid #3F3EED", backgroundColor: "rgb(233, 233, 255)", borderRadius: "8px" }}
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