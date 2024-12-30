import { useState } from "react";

interface AccordionItem {
  id: number;
  title: string;
  content: string;
}

const Accordion: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const items: AccordionItem[] = [
    { id: 1, title: "Accordion Item 1", content: "This is the content for item 1." },
    { id: 2, title: "Accordion Item 2", content: "This is the content for item 2." },
    { id: 3, title: "Accordion Item 3", content: "This is the content for item 3." },
  ];

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      {items.map((item) => (
        <div key={item.id} className="border border-gray-300 rounded-md">
          <button
            className="w-full flex justify-between items-center px-4 py-2 text-left font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200"
            onClick={() => toggleAccordion(item.id)}
          >
            <span>{item.title}</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${
                openId === item.id ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openId === item.id ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="p-4 text-gray-700">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
