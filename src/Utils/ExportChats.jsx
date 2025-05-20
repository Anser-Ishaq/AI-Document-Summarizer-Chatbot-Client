import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';

const wrapText = (text, font, fontSize, maxWidth) => {
    const paragraphs = text.split('\n');
    const lines = [];

    paragraphs.forEach(paragraph => {
        const words = paragraph.split(' ');
        let line = '';

        words.forEach(word => {
            const testLine = line ? `${line} ${word}` : word;
            const width = font.widthOfTextAtSize(testLine, fontSize);
            if (width < maxWidth) {
                line = testLine;
            } else {
                if (line) lines.push(line);
                line = word;
            }
        });

        if (line) lines.push(line);
        // Add a blank line to separate paragraphs
        lines.push('');
    });

    return lines;
};

export const exportChatsToPDF = async (chats, userId) => {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    let page = pdfDoc.addPage();
    let { width, height } = page.getSize();
    const marginLeft = 50;
    const lineHeight = 16;
    const maxTextWidth = width - marginLeft * 2;
    let y = height - 40;

    const addLine = (text, size = fontSize, color = rgb(0, 0, 0)) => {
        const lines = wrapText(text, font, size, maxTextWidth);
        lines.forEach((line) => {
            if (y < 50) {
                page = pdfDoc.addPage();
                y = height - 40;
            }
            page.drawText(line, { x: marginLeft, y, size, font, color });
            y -= lineHeight;
        });
    };

    // Title
    addLine(`User Chats - ${userId}`, 16, rgb(0, 0, 0.8));
    y -= 10;

    chats.forEach((chat, index) => {
        addLine(`\nChat #${index + 1}: ${chat.title}`);
        addLine(`Document: ${chat?.documents?.filename || 'N/A'}`, fontSize - 1);
        addLine(`Created: ${new Date(chat.created_at).toLocaleString()}`, fontSize - 1);

        if (chat.messages && chat.messages.length > 0) {
            chat.messages.forEach((msg) => {
                addLine(`${msg.role}: ${msg.content}`, fontSize - 2, rgb(0.2, 0.2, 0.2));
            });
        } else {
            addLine('No messages found for this chat.', fontSize - 2, rgb(1, 0, 0));
        }

        y -= 10;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, `chats-${userId}.pdf`);
};
