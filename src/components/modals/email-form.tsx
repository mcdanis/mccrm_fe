import React, { useEffect, useState } from "react";
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnUndo,
  BtnRedo,
  BtnLink,
  BtnBulletList,
  BtnStyles,
  //   ContentEditableEvent,
} from "react-simple-wysiwyg";
import ApiService from "@/utils/services/ApiService";
import { api, messageBox } from "@/utils/utils";
import Cookies from "js-cookie";
import ErrorElement from "@/components/error-element";
import LoadingIcon from "../loading-icon";

interface EmailTemplate {
  id: number;
  name: string;
  body: string;
  subject: string;
  contactId: number;
  subCampaignId: number;
  userId: number;
}

const EmailForm = ({
  closeModal,
  to,
  clientName,
  userId,
  subCampaignId,
  contactId,
}: {
  closeModal: () => void;
  to: string;
  clientName: string;
  userId: number;
  subCampaignId: number;
  contactId: number;
}) => {
  const apiService = new ApiService();
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [error, setError] = useState<string>("");

  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [isSendEmailLoading, setIsSendEmailLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEmailTemplate = async () => {
      const template = await apiService.getEmailTemplate();
      setEmailTemplates(template.data);
    };
    fetchEmailTemplate();
    setName(clientName);
  }, []);

  const handleTemplateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTemplateId = Number(event.target.value);
    const template = emailTemplates.find((t) => t.id === selectedTemplateId);

    if (template) {
      setSelectedTemplate(template);
      setSubject(template.subject);
      setBody(template.body);
    } else {
      setSelectedTemplate(null);
      setSubject("");
      setBody("");
    }
  };

  const sendEmail = async () => {
    const msg = await messageBox(
      "",
      "Sure to send an Email to " + name + " ?",
      "question"
    );
    if (!msg) {
      return;
    }

    setIsSendEmailLoading(true);
    if (!body || !subject || !to || !name) {
      setError("There are field not valid");
      setIsSendEmailLoading(false);
      return;
    }

    try {
      const response = await api("campaign/sub-campaign/contact/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("mccrm_token")}`,
        },
        body: JSON.stringify({
          subject,
          body,
          to,
          name,
          contactId,
          subCampaignId,
          userId,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error || "Something went wrong");
      setIsSendEmailLoading(false);
      messageBox("", data.message, "success", "no");
      setError("");
      setSelectedTemplate(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!emailTemplates) {
    return "loading...";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/3 md:w-2/3">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Write an Email</h2>
        <ErrorElement error={error} />
        <div className="grid grid-cols-1">
          <div className="w-full md:w-2/3 mb-5">
            <label htmlFor="template" className="label-gray">
              Template
            </label>
            <select
              name="template"
              id="template"
              className="select-orange"
              onChange={handleTemplateChange}
              value={selectedTemplate?.id || ""}
            >
              <option value="">Pilih template</option>
              {emailTemplates.map((client, index) => (
                <option key={index} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="subject" className="label-gray">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="input-orange"
              placeholder="Write Subject Here"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="label-gray">
              To <span className="font-bold">{to}</span>
            </label>
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="label-gray">
              Contact Name
            </label>
            <input
              type="text"
              id="name"
              className="input-orange"
              placeholder="Client Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="body" className="label-gray">
              Body
            </label>
            <EditorProvider>
              <Editor
                className="text-black bg-white max-h-48 overflow-y-auto"
                containerProps={{ style: { resize: "vertical" } }}
                name="note"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              >
                <Toolbar>
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <BtnStrikeThrough />
                  <BtnNumberedList />
                  <BtnUndo />
                  <BtnRedo />
                  <BtnLink />
                  <BtnBulletList />
                  <BtnStyles />
                </Toolbar>
              </Editor>
            </EditorProvider>
          </div>
        </div>
        {isSendEmailLoading}
        {!isSendEmailLoading ? (
          <div className="flex justify-end mt-5">
            <button className="btn-orange-sm" onClick={sendEmail}>
              Send
            </button>
            <button
              className="btn-orange-outline-sm ml-2 text-black"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <LoadingIcon></LoadingIcon>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailForm;
