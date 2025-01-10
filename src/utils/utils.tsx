"use client"
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export const useIsLogin = (defaultRedirect: string = '/crm', successRedirect: string = '/') => {
  // const router = useRouter();
  // const currentPath = window.location.pathname;

  // useEffect(() => {
  //   if (Cookies.get('mccrm_token')) {
  //     if (currentPath !== defaultRedirect) {
  //       router.push(defaultRedirect);
  //     }
  //   } else {
  //     if (currentPath !== successRedirect) {
  //       router.push(successRedirect);
  //     }
  //   }
  // }, [router, currentPath, defaultRedirect, successRedirect]);
};

export const api = async (path:string, payload:object) => {
  return fetch(process.env.URL + path, payload);
}
