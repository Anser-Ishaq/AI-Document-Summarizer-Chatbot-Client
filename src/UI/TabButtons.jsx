import Button from 'react-bootstrap/Button';

export const ActionButton = ({ variant, onClick, label }) => {
    return (
        <Button
            style={{ fontSize: '10px', width: '30%', maxWidth: '120px', minWidth: '80px' }}
            variant={variant}
            className="rounded-pill"
            onClick={onClick}
        >
            {label}
        </Button>
    );
};

// Reusable action row component
export const ActionRow = ({ label, buttonVariant, buttonLabel, onButtonClick }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="me-2">{label}</span>
            <ActionButton
                variant={buttonVariant}
                label={buttonLabel}
                onClick={onButtonClick}
            />
        </div>
    );
};