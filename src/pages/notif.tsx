import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Toaster } from "@/components/ui/toaster";
import { MutateNotif } from "@/tanstack/register-tanstack";
import { notifSchema, NotifType } from "@/validator/auth";
import { Box, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Notif() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NotifType>({
    resolver: zodResolver(notifSchema),
    defaultValues: {
      subject: "Reset page link",
      to: "",
      url: `${import.meta.env.VITE_APP_URL}reset/`,
      text: "Reset password page",
    },
  });
  const { mutateAsync, isPending } = MutateNotif();
  async function handleSendNotif(data: NotifType) {
    await mutateAsync(data);
  }

  return (
    <Box
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      gap="2rem"
    >
      <Text fontWeight="bold" fontSize="1.5rem">
        Send Reset Link
      </Text>
      <form onSubmit={handleSubmit(handleSendNotif)}>
        <Box display="flex" flexDirection="column" gap="1rem" width="18rem">
          <Field
            label="Enter your email"
            errorText={errors.to?.message}
            invalid={!!errors.to}
          >
            <Input type="email" {...register("to")} />
          </Field>
          <Button
            backgroundColor="white"
            color="black"
            type="submit"
            loading={isPending}
          >
            Send
          </Button>
        </Box>
      </form>
      <Toaster />
    </Box>
  );
}
