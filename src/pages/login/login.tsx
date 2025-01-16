import { MutateLogin } from "@/tanstack/tanstack";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { LoginSchema, LoginType } from "@/validator/auth";
import { Box, Input, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { isLoggedIn } from "@/services/auth";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const { mutateAsync, isPending } = MutateLogin();
  const navigate = useNavigate();

  async function handleSubmitLogin(data: LoginType) {
    const login = await mutateAsync(data);
    if (login.data) {
      Cookies.set("cookies", login.data);
      console.log(login.data);
      navigate("/");
    }
  }

  if (isLoggedIn()) {
    return <Navigate to="/" />;
  }

  return (
    <Box>
      <Text fontWeight="bold">Sign in to Brevity</Text>
      <form onSubmit={handleSubmit(handleSubmitLogin)}>
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
        <Button type="submit" loading={isPending}>
          Sign in
        </Button>
      </form>
    </Box>
  );
}
