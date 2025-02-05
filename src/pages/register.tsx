import { Box, Text, Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { RegisterSchema, registerType } from "@/validator/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { MutateRegister } from "@/tanstack/register-tanstack";
import { Toaster } from "@/components/ui/toaster";
import { Link } from "react-router";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>({
    resolver: zodResolver(RegisterSchema),
  });
  const { mutateAsync, isPending } = MutateRegister();
  async function handleSubmitRegister(data: registerType) {
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
        Register to brevity
      </Text>
      <form onSubmit={handleSubmit(handleSubmitRegister)}>
        <Box display="flex" flexDirection="column" gap="1rem" width="18rem">
          <Field
            label="Name"
            errorText={errors.name?.message}
            invalid={!!errors.name}
          >
            <Input type="text" {...register("name")} />
          </Field>
          <Field
            label="Username"
            errorText={errors.username?.message}
            invalid={!!errors.username}
          >
            <Input type="text" {...register("username")} />
          </Field>
          <Field
            label="Email"
            errorText={errors.email?.message}
            invalid={!!errors.email}
          >
            <Input type="email" {...register("email")} />
          </Field>
          <Field
            label="Password"
            errorText={errors.password?.message}
            invalid={!!errors.password}
          >
            <Input type="password" {...register("password")} />
          </Field>
          <Link to="/sign-in" style={{ color: "gray", fontSize: "0.8rem" }}>
            Already have an account!
          </Link>
          <Button
            backgroundColor="white"
            color="black"
            type="submit"
            loading={isPending}
          >
            Register
          </Button>
        </Box>
      </form>
      <Toaster />
    </Box>
  );
}
