import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { MutatePassword } from "@/tanstack/register-tanstack";
import { passwordSchema, PasswordType } from "@/validator/auth";
import { Box, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

export default function Forgot() {
  const userId = useParams().userId;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordType>({
    resolver: zodResolver(passwordSchema),
  });
  const { mutateAsync, isPending } = MutatePassword(userId);
  async function handleChangePassword(data: PasswordType) {
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
        Reset Password
      </Text>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <Box display="flex" flexDirection="column" gap="1rem" width="18rem">
          <Field
            label="Enter your new password"
            errorText={errors.password?.message}
            invalid={!!errors.password}
          >
            <Input type="password" {...register("password")} />
          </Field>
          <Button
            backgroundColor="white"
            color="black"
            type="submit"
            loading={isPending}
          >
            Create new password
          </Button>
        </Box>
      </form>
    </Box>
  );
}
