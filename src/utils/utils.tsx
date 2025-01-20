"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Swal from "sweetalert2";

// export const useIsLogin = (
//   defaultRedirect: string = "/crm",
//   successRedirect: string = "/"
// ) => {
//   const router = useRouter();
//   const currentPath = window.location.pathname;
//   useEffect(() => {
//     if (Cookies.get('mccrm_token')) {
//       if (currentPath !== defaultRedirect) {
//         router.push(defaultRedirect);
//       }
//     } else {
//       if (currentPath !== successRedirect) {
//         router.push(successRedirect);
//       }
//     }
//   }, [router, currentPath, defaultRedirect, successRedirect]);
// };

export const useIsNotLogin = () => {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("mccrm_token")) {
      router.push("/");
    }
  });
};

export const useIsLogin = () => {
  const router = useRouter();
  useEffect(() => {
    if (Cookies.get("mccrm_token")) {
      router.push("/crm");
    }
  });
};

export const convertTime = (dateTime) => {
  const date = new Date(dateTime);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const formattedDate = date.toLocaleString("id-ID", options);

  return formattedDate;
};

export const api = async (path: string, payload: object) => {
  return fetch(process.env.URL + path, payload);
};

export const contact_status: { [key: number]: string } = {
  1: "Draf",
  2: "Open",
  3: "On Progress",
  4: "Qualification Lead",
  5: "Negotiation",
  6: "Deal",
  7: "Active Project",
  8: "Done",
  9: "Lost ",
};

export const lead_type: { [key: number]: string } = {
  1: "Cold",
  2: "Warm (MQL)",
  3: "Hot (SQL)",
};

export const level_priority: { [key: number]: string } = {
  1: "Low",
  2: "Medium",
  3: "Priority",
};

export const tag: { [key: number]: string } = {
  1: "Tag1",
  2: "Tag2",
  3: "Tag3",
};

export const convert = (value: number, type: string) => {
  let result: string | undefined;

  switch (type) {
    case "status":
      result = contact_status[value];
      break;
    case "level_priority":
      result = level_priority[value];
      break;
    case "tag":
      result = tag[value];
      break;
    default:
      result = undefined;
  }

  return result ? result : "Unknown";
};

export const messageBox = async (
  title: string,
  msg: string,
  icon: string,
  noCB: string = "yes"
) => {
  const isCancelButtonVisible = noCB == "yes";

  return new Promise((resolve) => {
    Swal.fire({
      title: title,
      text: msg,
      icon: icon as "success" | "error" | "warning" | "info" | "question",
      confirmButtonText: "Ok",
      cancelButtonText: "Cancel",
      showCancelButton: isCancelButtonVisible,
      customClass: {
        confirmButton: "btn-orange-sm",
        cancelButton: "btn-orange-outline-sm-i",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else if (result.isDismissed) {
        resolve(false);
      }
    });
  });
};
