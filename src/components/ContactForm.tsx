import type { FC, FormEventHandler } from "react";
import { useState } from "react";
import { useT } from "../contexts/stringTranslations";
import Input from "./Input";
import Textarea from "./Textarea";
import RichText from "./RichText";

const ContactForm: FC = () => {
  const serverErrorMessage = useT('contact.form.submit.server.error');
  const clientErrorMessage = useT('contact.form.submit.client.error');
  const submitLabel = useT('generic.form.submit');
  const successLabel = useT('contact.form.submit.success');
  const nameLabel = useT('contact.form.name');
  const emailLabel = useT('contact.form.email');
  const telLabel = useT('contact.form.phonenumber');
  const messageLabel = useT('contact.form.message');
  const privacyPolicyLabel = useT('generic.form.privacy.policy');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const useSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);

    try {
      const { status } = await fetch("/api/contact-form", {
        body: JSON.stringify(Object.fromEntries(formData)),
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (status === 201) {
        setSubmitted(true);
      } else if (status === 404 || status >= 500 && status < 600) {
        setErrorMessage(serverErrorMessage);
      } else if (status >= 400 && status < 500) {
        setErrorMessage(clientErrorMessage);
      }
    } catch (e) {
      // error if endpoint is not setup properly
      setErrorMessage(serverErrorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-slate-100 border-black border-2 rounded-md">
      {submitted
        ? <p className="font-sans font-bold">{successLabel}</p>
        : (
          <form onSubmit={useSubmit} className="flex flex-col gap-4">
            <Input type="text" name="name" required label={nameLabel} disabled={submitting} />
            <Input type="email" name="email" required label={emailLabel} disabled={submitting} />
            <Input type="tel" name="tel" label={telLabel} disabled={submitting} />
            <Textarea name="message" required label={messageLabel} disabled={submitting} />
            <RichText html={`<p>${privacyPolicyLabel}</p>`} />
            <input
              className="font-sans enabled:cursor-pointer color-black disabled:text-slate-500 disabled:cursor-default mt-4 bg-slate-300 p-2 border-black disabled:border-slate-500 border-2 hover:enabled:bg-slate-400 focus:enabled:bg-slate-400"
              type="submit"
              value={submitLabel}
              disabled={submitting}
            />
            {(errorMessage !== "") && <p className="font-sans font-bold">{errorMessage}</p>}
          </form>
        )
      }
    </div>
  );
};

export default ContactForm;