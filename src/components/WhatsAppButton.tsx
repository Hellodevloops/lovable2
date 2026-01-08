import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export const WhatsAppButton = ({ 
  phoneNumber, 
  message = "Hello, I'm interested in learning more about LuxeHire's recruitment services." 
}: WhatsAppButtonProps) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#20BD5A] transition-all duration-300 hover:scale-105 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-5 h-5" fill="currentColor" />
      <span className="text-sm font-medium hidden sm:inline-block">
        Chat with us
      </span>
    </a>
  );
};
