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

export const api = async (path: string, payload: object) => {
  return fetch(process.env.URL + path, payload);
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
        cancelButton: "btn-orange-outline-sm-i"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else if (result.isDismissed) {
        resolve(false);
      }
    });
  });
};
