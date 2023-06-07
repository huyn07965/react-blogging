import React, { Fragment, useState } from "react";
import IconEyeClose from "../icon/IconEyeClose";
import IconEyeOpen from "../icon/IconEyeOpen";
import Input from "./Input";
import { useTranslation } from "react-i18next";

const InputPasswordToogle = ({ control }) => {
  const { t } = useTranslation();
  const [tooglePassword, setTooglePassword] = useState(false);
  const hanleTooglePassword = () => {
    setTooglePassword(!tooglePassword);
  };
  if (!control) return null;
  return (
    <Fragment>
      <Input
        placeholder={t("passPlace")}
        type={tooglePassword ? "text" : "password"}
        name="password"
        control={control}
      >
        {tooglePassword ? (
          <IconEyeOpen
            onClick={hanleTooglePassword}
            className="icon-eye"
          ></IconEyeOpen>
        ) : (
          <IconEyeClose
            onClick={hanleTooglePassword}
            className="icon-eye"
          ></IconEyeClose>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToogle;
