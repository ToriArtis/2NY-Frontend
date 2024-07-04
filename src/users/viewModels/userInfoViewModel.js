import React from "react";
import info from "../models/User";

export default function UserInfoViewModel(){
    const [error, setError] = useState(null);
    const { values, handleChange } = info();
    

    return {
        email: values?.email || '',
        password: values?.password || '',
        realName: values?.realName || '',
        nickName: values?.nickName || '',
        address: values?.address || '',
        detailAddress: values?.detailAddress || '',
        phone: values?.phone || '',
        handleChange,
        handleSubmit,
        error,
      };
}