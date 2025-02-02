import { isLoggedIn } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { MutateLogin } from "@/tanstack/login-tanstack";
import { LoginSchema, LoginType } from "@/validator/auth";
import { Box, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutateAsync, isPending } = MutateLogin();

  async function handleSubmitLogin(data: LoginType) {
    const login = await mutateAsync(data);
    if (login.data) {
      Cookies.set("cookies", login.data);
      window.location.href = "/";
    }
  }

  if (isLoggedIn()) {
    return <Navigate to="/" />;
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
        Sign in to Brevity
      </Text>
      <form onSubmit={handleSubmit(handleSubmitLogin)}>
        <Box display="flex" flexDirection="column" gap="1rem" width="18rem">
          <Field
            label="Email / Username"
            errorText={errors.identifier?.message}
            invalid={!!errors.identifier}
          >
            <Input type="text" {...register("identifier")} />
          </Field>
          <Field
            label="Password"
            errorText={errors.password?.message}
            invalid={!!errors.password}
          >
            <Input type="password" {...register("password")} />
          </Field>
          <Box display="flex" justifyContent="space-between">
            <Link to="/register" style={{ fontSize: "0.7rem", color: "gray" }}>
              Don't have an account?
            </Link>
            <Link to="/forgot" style={{ fontSize: "0.7rem", color: "gray" }}>
              Forgot password?
            </Link>
          </Box>
          <Button
            backgroundColor="white"
            color="black"
            type="submit"
            loading={isPending}
          >
            Sign in
          </Button>
        </Box>
      </form>
    </Box>
  );
}
