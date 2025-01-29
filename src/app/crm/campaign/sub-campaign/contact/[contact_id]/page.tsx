"use client";

import React from "react";
import { useState, useEffect } from "react";
import Header from "@/app/crm/header";
import { Inter } from "@next/font/google";
import { useParams, useRouter } from "next/navigation";
import ApiService from "@/utils/services/ApiService";
import { ContactValidation } from "@/utils/validation";
import Cookies from "js-cookie";
import ErrorElement from "@/components/error-element";
import {
  convertTime,
  contact_status,
  tag,
  level_priority,
  lead_type,
  messageBox,
} from "@/utils/utils";
import { Editor, ContentEditableEvent } from "react-simple-wysiwyg";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

interface ContactBant {
  id: number;
  contact_id: number;
  lead_type: number;
  lead_owner: number;
  budget: string;
  authority: string;
  need: string;
  time: string;
  spesification_project: string;
  next_step: string;
  createdAt: string;
}

interface ContactActivity {
  // Misalkan ada beberapa properti di dalam array ini
  // Contoh:
  id: number;
  contact_id: number;
  sub_campaign_id: number;
  title: string;
  description: string;
  createdAt: string;
}

interface ContactTimeline {
  id: number;
  contact_id: number;
  sub_campaign_id: number;
  title: string;
  description: string;
  createdAt: string;
}

interface ContactFinal {
  id: number;
  sub_campaign_id: number;
  contact_id: number;
  result_negotiation: string | null;
  project_name: string;
  start_date: string;
  end_date: string;
  deal: number;
  payment_status: number;
  deal_done: number;
  evaluation: string;
  feedback: string;
  dorumentation: string;
  createdAt: string;
}

interface Contact {
  id: number;
  sub_campaign_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  country: string;
  company: string;
  address: string;
  tag: string;
  level_priority: string;
  source: string;
  status: string;
  result_negotiation: string | null;
  createdAt: string;
  contactBant: ContactBant;
  contactActivity: ContactActivity[];
  contactTimeline: ContactTimeline[];
  contactFinal: ContactFinal;
}

interface Campaign {
  name: string;
}

interface SubCampaign {
  id: number;
  campaign_id: number;
  name: string;
  owner: number;
  manager: number;
  status: string;
  client_id: number;
  created_by: number;
  createdAt: string;
  campaign: Campaign;
}

interface Data {
  contact: Contact;
  subCampaign: SubCampaign;
}

interface TimelineItem {
  type: string;
  createdAt: string;
  title: string;
  description: string;
}

interface User {
  id: number;
  name: string;
}

const Contact = () => {
  const apiService = new ApiService();
  const params = useParams();
  const router = useRouter();

  const { contact_id } = params;

  const [activeTab, setActiveTab] = useState("notes");
  const [error, setError] = useState("");

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  const [users, setUsers] = useState<User[]>([]);
  const [activeTimelineTab, setActiveTimelineTab] = useState("all");
  const [contact, setContact] = useState<Data>();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]); // Definisikan tipe state

  const tabs = [
    { id: "all", label: "All" },
    { id: "not", label: "Notes" },
    { id: "con", label: "Contact" },
    { id: "act", label: "Activity" },
    { id: "qua", label: "Qualification" },
    { id: "neg", label: "Negotiation" },
    { id: "don", label: "Done" },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTimelineTab(tabId);
  };

  useEffect(() => {
    const fetchContact = async () => {
      const contact = await apiService.getContact(Number(contact_id));
      setContact(contact);
    };
    fetchContact();
    const fetchUsers = async () => {
      const users = await apiService.getUsers();
      setUsers(users);
    };
    fetchUsers();
    const fetchTimeline = async () => {
      const timeline = await apiService.getContactTimeline(Number(contact_id));
      setTimeline(timeline);
    };
    fetchTimeline();
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    company: "",
    country: "",
    address: "",
    source: "",
    // note
    note: "",
    tag: "",
    levelPriority: "",
    // activity
    inputProgress: "",
    description: "",
    // qualified
    leadType: 0,
    leadOwner: "",
    budget: "",
    authority: "",
    need: "",
    time: "",
    spesificationProject: "",
    nextStep: "",
    // nego
    projectName: "",
    projectStartdate: "",
    projectEnddate: "",
    resultOfNegotiation: "",
    // done
    paymentStatus: "",
    deal: "",
    dealDone: "",
    evaluation: "",
    feedback: "",
    documentation: "",
    contactId: contact_id,
    subCampaignId: "",
    userId: Cookies.get("mccrm_user_id"),
    status: "",
  });

  const handleChange = (
    event:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | ContentEditableEvent
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [String(name)]: value,
    }));
  };

  useEffect(() => {
    if (contact) {
      setFormData({
        ...formData,
        fullName: contact.contact.full_name || "",
        phoneNumber: contact.contact.phone_number || "",
        email: contact.contact.email || "",
        company: contact.contact.company || "",
        country: contact.contact.country || "",
        source: contact.contact.source || "",
        address: contact.contact.address || "",
        tag: contact.contact.tag || "",
        levelPriority: contact.contact.level_priority || "",
        status: contact.contact.status,
        leadType: contact.contact.contactBant
          ? contact.contact.contactBant.lead_type
          : 0,
        budget: contact.contact.contactBant
          ? contact.contact.contactBant.budget
          : "",
        authority: contact.contact.contactBant
          ? contact.contact.contactBant.authority
          : "",
        time: contact.contact.contactBant
          ? contact.contact.contactBant.time
          : "",
        need: contact.contact.contactBant
          ? contact.contact.contactBant.need
          : "",
        nextStep: contact.contact.contactBant
          ? contact.contact.contactBant.next_step
          : "",
        spesificationProject: contact.contact.contactBant
          ? contact.contact.contactBant.spesification_project
          : "",
        leadOwner: contact.contact.contactBant
          ? String(contact.contact.contactBant.lead_owner)
          : "",
        projectName: contact.contact.contactFinal
          ? contact.contact.contactFinal.project_name
          : "",
        projectStartdate: contact.contact.contactFinal
          ? contact.contact.contactFinal.start_date
          : "",
        projectEnddate: contact.contact.contactFinal
          ? contact.contact.contactFinal.end_date
          : "",
        deal: contact.contact.contactFinal
          ? String(contact.contact.contactFinal.deal)
          : "",
        resultOfNegotiation: contact.contact.contactFinal
          ? String(contact.contact.contactFinal.result_negotiation)
          : "",

        dealDone: contact.contact.contactFinal
          ? String(contact.contact.contactFinal.deal_done)
          : "",
        evaluation: contact.contact.contactFinal
          ? contact.contact.contactFinal.evaluation
          : "",
        feedback: contact.contact.contactFinal
          ? contact.contact.contactFinal.feedback
          : "",
        documentation: contact.contact.contactFinal
          ? contact.contact.contactFinal.dorumentation
          : "",
        paymentStatus: contact.contact.contactFinal
          ? String(contact.contact.contactFinal.payment_status)
          : "",
        subCampaignId: contact.contact
          ? String(contact.contact.sub_campaign_id)
          : "",
      });
    }
  }, [contact]);

  const saveNote = async () => {
    if (contact) {
      const data = {
        contactId: contact.contact.id,
        subCampaignId: contact.contact.sub_campaign_id,
        note: formData.note,
        userId: Cookies.get("mccrm_user_id"),
      };

      const addNote = await apiService.addNote(data);
      if (addNote.error == false) {
        await messageBox("", "Note Berhasil di tambahkan !!", "success", "no");
        setError("");
        formData.note = "";
      } else {
        setError(addNote.message);
      }
    }
  };

  const saveActivity = async () => {
    if (contact) {
      const data = {
        contactId: contact.contact.id,
        description: formData.description,
        title: formData.inputProgress,
        userId: Cookies.get("mccrm_user_id"),
      };

      const addNote = await apiService.addActivity(data);
      if (addNote.error == false) {
        await messageBox("", "Activity successfully added !!", "success", "no");
        setError("");
        formData.description = "";
        formData.inputProgress = "";
      } else {
        setError(addNote.message);
      }
    }
  };

  const handleSubmit = async () => {
    const validateContact = await ContactValidation(formData);

    if (validateContact.error) {
      alert(validateContact.message);
      return;
    }
    const updateContact = await apiService.updateContact(formData);
    if (updateContact.error == false) {
      await messageBox("", "Contact successfully updated !!", "success", "no");
      setError("");
    } else {
      setError(updateContact.message);
    }
  };

  const filteredTimeline =
    activeTimelineTab === "all"
      ? timeline ?? []
      : (timeline ?? []).filter((item) => item.type === activeTimelineTab);

  const back = () => {
    router.back();
  };

  const [isPopoverVisible, setPopoverVisible] = useState(false);

  // Toggle popover visibility
  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  if (!contact) {
    return <>please wait..</>;
  }

  return (
    <>
      <Header />
      <div className="flex h-auto items-stretch">
        <div className="bg-[#F3F4F6] w-1/4 p-4">
          <h2
            className={`font-bold text-lg mb-4 text-gray-700 ${inter.className}`}
          >
            PERSONAL INFORMATION
          </h2>
          <label className="text-xs italic text-gray-500">
            Created at : {convertTime(contact.contact.createdAt)}
          </label>
          <div className="grid grid-cols-1 gap-4 mt-3">
            <div className="min-h-1">
              <label className="label-gray">Full Name</label>
              <input
                className="input-orange"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label-gray">Phone Number</label>
              <input
                className="input-orange"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label-gray">Email</label>
              <input
                className="input-orange"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label-gray">Company</label>
              <input
                className="input-orange"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label-gray">Country</label>
              <input
                className="input-orange"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label-gray">Address</label>
              <textarea
                className="input-orange"
                name="address"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="label-gray">Source</label>
              <textarea
                className="input-orange"
                name="source"
                value={formData.source}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="w-3/4 p-4 bg-white">
          <div className="flex items-center p-4 bg-[#F3F4F6] shadow-md">
            <button
              className="flex items-center text-gray-600 hover:text-orange-500 focus:outline-none text-sm"
              onClick={back}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12H3m0 0l6-6m-6 6l6 6"
                />
              </svg>
              Back
            </button>

            <div className="flex items-center w-full">
              <h1 className={`ml-4 font-bold text-gray-800 ${inter.className}`}>
                {contact.subCampaign.campaign.name}
                <span className="text-orange-600"> \ </span>
                {contact.subCampaign.name}
              </h1>
              <button className="ml-auto btn-orange-sm" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-3">
            <div className="">
              <div className="flex-1">
                {/* Tabs */}
                {/* <button
                  onClick={() => switchTab("notes")}
                  className={`py-2 px-4 border border-gray-400 rounded bg-[#F3F4F6] text-gray-400`}
                >
                  Disable
                </button>
                <button
                  onClick={() => switchTab("notes")}
                  className={`hover:bg-[#3c5d8f] py-2 px-4 border border-[#3c5d8f] hover:text-white rounded bg-[#F3F4F6] text-black`}
                >
                  button aktif
                </button> */}
                <ErrorElement error={error} />
                <div className="mt-3 flex space-x-1 mb-4">
                  <button
                    onClick={() => switchTab("notes")}
                    className={`hover:bg-[#1c3458]  text-xs  px-2 text-sm py-2 border border-[#3c5d8f] hover:text-white rounded ${
                      activeTab == "notes"
                        ? "bg-[#5C708E] text-white"
                        : "bg-[#F3F4F6] text-black"
                    }`}
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => switchTab("progress")}
                    className={`hover:bg-[#1c3458] text-xs px-2 text-sm py-2 border border-[#3c5d8f] hover:text-white rounded ${
                      activeTab == "progress"
                        ? "bg-[#5C708E] text-white"
                        : "bg-[#F3F4F6] text-black"
                    }`}
                  >
                    Activity
                  </button>
                  {Number(formData.status) >= 4 &&
                    Number(formData.status) != 9 && (
                      <button
                        onClick={() => switchTab("status")}
                        className={`hover:bg-[#1c3458] text-xs px-2 text-sm py-2 border border-[#3c5d8f] hover:text-white rounded ${
                          activeTab == "status"
                            ? "bg-[#5C708E] text-white"
                            : "bg-[#F3F4F6] text-black"
                        }`}
                      >
                        Qualification
                      </button>
                    )}
                  {Number(formData.status) >= 5 &&
                    Number(formData.status) != 9 && (
                      <button
                        onClick={() => switchTab("negotiation")}
                        className={`hover:bg-[#1c3458] text-xs  px-2 text-sm py-2 border border-[#3c5d8f] hover:text-white rounded ${
                          activeTab == "negotiation"
                            ? "bg-[#5C708E] text-white"
                            : "bg-[#F3F4F6] text-black"
                        }`}
                      >
                        Negotiation
                      </button>
                    )}
                  {Number(formData.status) == 8 &&
                    Number(formData.status) != 9 && (
                      <button
                        onClick={() => switchTab("done")}
                        className={`hover:bg-[#1c3458] text-xs  px-2 text-sm py-2 border border-[#3c5d8f] hover:text-white rounded ${
                          activeTab == "done"
                            ? "bg-[#5C708E] text-white"
                            : "bg-[#F3F4F6] text-black"
                        }`}
                      >
                        Done
                      </button>
                    )}
                </div>

                {/* Notes Section */}
                {activeTab == "notes" && (
                  <div className="bg-secondary p-4 rounded shadow-md">
                    <div className="mb-1">
                      <label className="label-gray" htmlFor="note">
                        Input Note
                      </label>
                      <Editor
                        className="text-black bg-white"
                        containerProps={{ style: { resize: "vertical" } }}
                        value={formData.note}
                        name="note"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <button className="btn-orange-sm" onClick={saveNote}>
                        Save Notes
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <label className="label-gray" htmlFor="tag">
                          Tag
                        </label>
                        <select
                          id="tag"
                          className="select-orange"
                          name="tag"
                          onChange={handleChange}
                          value={formData.tag}
                        >
                          {Object.entries(tag).map(([key, value]) => (
                            <option key={key} value={key}>
                              {" "}
                              {value}{" "}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label-gray" htmlFor="contact-status">
                          Contact Status{" "}
                          <svg
                            onClick={togglePopover}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-black-500 text-xs"
                            style={{ display: "inline" }}
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="8" />
                            <line x1="12" y1="12" x2="12" y2="16" />
                          </svg>
                        </label>
                        <div className="relative inline-block text-left h-100">
                          {isPopoverVisible && (
                            <div
                              className="absolute z-10 w-64 p-4 mt-2 text-sm text-gray-700 bg-white border border-gray-300 rounded shadow-lg"
                              style={{
                                top: "100%",
                                left: "50%",
                                transform: "translateX(-50%)",
                              }}
                            >
                              <h3 className="font-semibold text-sm">
                                CONTACT STATUS INFO
                              </h3>
                              <p className="mt-2">
                                <b>Draf</b> = Kontak belum bisa di proses
                                <br />
                                <br />
                                <b>Open</b> = Kontak bisa di ambil dan di proses
                                <br />
                                <br />
                                <b>On Progress</b> = Kontak masih di
                                kontak/hubungi untuk di tawari produk
                                <br />
                                <br />
                                <b>Quafilication lead</b> = Kontak yang sudah
                                merespon dan menjelaskan apa kemauan mereka
                                <br />
                                <br />
                                <b>Negotiation</b> = Kontak yang sudah membahasa
                                harga dan fitur
                                <br />
                                <br />
                                <b>Deal</b> = Kontak yang sudah setuju dengan
                                fitur dan harga, tetapi belum menyelesaikan
                                transaksi
                                <br />
                                <br />
                                <b>Active Project</b> = Projek sedang di
                                kerjakan dan aktif
                                <br />
                                <br />
                                <b>Done</b> = Projek selesai
                                <br />
                                <br />
                                <b>Lost</b> = Kontak tidak tertarik, tidak
                                merespon samasekali
                                <br />
                              </p>
                              <button
                                onClick={togglePopover}
                                className="mt-2 text-xs text-blue-500 hover:text-blue-700"
                              >
                                Tutup
                              </button>
                            </div>
                          )}
                        </div>
                        <select
                          id="contact-status"
                          className="select-orange"
                          name="status"
                          onChange={handleChange}
                          value={formData.status}
                        >
                          {Object.entries(contact_status).map(
                            ([key, value]) => (
                              <option key={key} value={key}>
                                {" "}
                                {value}{" "}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="label-gray">Level Priority</label>
                        <select
                          id="tag"
                          className="select-orange"
                          name="levelPriority"
                          onChange={handleChange}
                          value={formData.levelPriority}
                        >
                          {Object.entries(level_priority).map(
                            ([key, value]) => (
                              <option key={key} value={key}>
                                {" "}
                                {value}{" "}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* progress section */}
                {activeTab == "progress" && (
                  <div className="bg-secondary p-4 rounded shadow-md">
                    <div className="grid grid-cols-2 gap-2">
                      {/* <div>
                        <label className="label-gray">Salesperson</label>
                        <input className="input-orange" />
                      </div> */}
                      <div>
                        <label className="label-gray">Input Progress</label>
                        <input
                          className="input-orange"
                          name="inputProgress"
                          value={formData.inputProgress}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="label-gray">Description</label>
                        <textarea
                          className="input-orange"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn-orange-sm"
                          onClick={saveActivity}
                        >
                          Update Activity
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* negotiation section */}
                {activeTab == "negotiation" && (
                  <div className="bg-secondary p-4 rounded shadow-md">
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <label className="label-gray">Project Name</label>
                        <input
                          type="text"
                          className="input-orange"
                          name="projectName"
                          onChange={handleChange}
                          value={formData.projectName}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div>
                        <label className="label-gray">Project Startdate</label>
                        <input
                          type="text"
                          className="input-orange"
                          name="projectStartdate"
                          onChange={handleChange}
                          value={formData.projectStartdate}
                        />
                      </div>
                      <div>
                        <label className="label-gray">Deadline Project</label>
                        <input
                          type="text"
                          className="input-orange"
                          name="projectEnddate"
                          onChange={handleChange}
                          value={formData.projectEnddate}
                        />
                      </div>
                      <div>
                        <label className="label-gray">Deal</label>
                        <input
                          type="number"
                          className="input-orange"
                          name="deal"
                          onChange={handleChange}
                          value={formData.deal}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      <div>
                        <label className="label-gray">
                          Result of Negotiation
                        </label>
                        <Editor
                          className="text-black bg-white"
                          containerProps={{ style: { resize: "vertical" } }}
                          value={formData.resultOfNegotiation}
                          name="resultOfNegotiation"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* done section */}
                {activeTab == "done" && (
                  <div className="bg-secondary p-4 rounded shadow-md">
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      <div>
                        <label className="label-gray">Payment Status</label>
                        <select
                          className="select-orange"
                          value={formData.paymentStatus}
                          name="paymentStatus"
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="2">Half</option>
                          <option value="1">Paid</option>
                          <option value="0">Not</option>
                        </select>
                      </div>

                      <div>
                        <label className="label-gray">Deal</label>
                        <input
                          type="number"
                          className="input-orange"
                          value={formData.dealDone}
                          name="dealDone"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      <div>
                        <label className="label-gray">Evaluation</label>
                        <Editor
                          className="text-black bg-white"
                          containerProps={{ style: { resize: "vertical" } }}
                          value={formData.evaluation}
                          name="evaluation"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="label-gray">Feedback</label>
                        <Editor
                          className="text-black bg-white"
                          containerProps={{ style: { resize: "vertical" } }}
                          value={formData.feedback}
                          name="feedback"
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="label-gray">Documentation</label>
                        <small>
                          di isi seperti tools module librari dll yg di gunakan,
                          link web nya apa dll pokoknya supaya hasil kerja bisa
                          di lihat oleh ceo{" "}
                        </small>
                        <Editor
                          className="text-black bg-white"
                          containerProps={{ style: { resize: "vertical" } }}
                          value={formData.documentation}
                          name="documentation"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* status section */}
                {activeTab == "status" && (
                  <div className="bg-secondary p-4 rounded shadow-md">
                    <div className="grid grid-cols-2 grid-rows-3 gap-3">
                      <div>
                        <label className="label-gray">Lead Type</label>
                        <select
                          className="select-orange"
                          name="leadType"
                          onChange={handleChange}
                          value={formData.leadType}
                        >
                          <option value="">Select</option>
                          {Object.entries(lead_type).map(([key, value]) => (
                            <option key={key} value={key}>
                              {" "}
                              {value}{" "}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label-gray">Lead Owner</label>
                        <select
                          className="select-orange"
                          name="leadOwner"
                          onChange={handleChange}
                          value={formData.leadOwner}
                        >
                          <option value="">Select</option>
                          {users.map((user, index) => (
                            <option key={index} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="label-gray">Budget</label>
                        <textarea
                          className="input-orange"
                          name="budget"
                          onChange={handleChange}
                          value={formData.budget}
                        ></textarea>
                      </div>
                      <div>
                        <label className="label-gray">Authority</label>
                        <textarea
                          className="input-orange"
                          name="authority"
                          onChange={handleChange}
                          value={formData.authority}
                        ></textarea>
                      </div>
                      <div>
                        <label className="label-gray">Need</label>
                        <textarea
                          className="input-orange"
                          name="need"
                          onChange={handleChange}
                          value={formData.need}
                        ></textarea>
                      </div>
                      <div>
                        <label className="label-gray">Time</label>
                        <textarea
                          className="input-orange"
                          name="time"
                          onChange={handleChange}
                          value={formData.time}
                        ></textarea>
                      </div>
                      <div>
                        <label className="label-gray">
                          Spesification of Project
                        </label>
                        <textarea
                          className="input-orange"
                          name="spesificationProject"
                          onChange={handleChange}
                          value={formData.spesificationProject}
                        ></textarea>
                      </div>
                      <div>
                        <label className="label-gray">Next Step</label>
                        <textarea
                          className="input-orange"
                          name="nextStep"
                          onChange={handleChange}
                          value={formData.nextStep}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="">
              <div className="container mx-auto">
                <div className="flex mb-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`flex-1 py-1 text-center ${
                        activeTimelineTab === tab.id
                          ? "bg-[#5C708E] text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => handleTabClick(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="timeline max-h-80 overflow-y-auto">
                  {filteredTimeline.map((item, index) => (
                    <div key={index} className="border-b py-4">
                      <div className="text-xs text-gray-500 italic">
                        {convertTime(item.createdAt)}
                      </div>
                      <div className="font-semibold text-gray-700 text-lg">
                        {item.title}
                      </div>
                      <div
                        className="text-gray-700 text-sm"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
