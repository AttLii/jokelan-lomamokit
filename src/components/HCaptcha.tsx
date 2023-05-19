import { Dispatch, FC, SetStateAction } from "react";
import HCaptchaComponent from '@hcaptcha/react-hcaptcha';

type Props = {
  setVerified: Dispatch<SetStateAction<boolean>>
}
export const HCaptcha: FC<Props> = ({ setVerified }) => {
  const onVerify = () => setVerified(true)
  const onError = () => setVerified(false)
  return (
    <HCaptchaComponent
      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
      size="normal"
      tabIndex={0}
      onVerify={onVerify}
      onError={onError}
    />
  )
}