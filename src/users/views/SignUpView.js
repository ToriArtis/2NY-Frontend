import React from "react";

import { useSignUpViewModel } from "../viewModels/useSignUpViewModel";

function SignUpView() {
    const { register, handleSubmit, errors, error } = useSignUpViewModel();
  
    return (
      <form onSubmit={handleSubmit}>
        <input {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <input {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <input {...register("username")} />
        {errors.username && <span>{errors.username.message}</span>}
        <button type="submit">Sign Up</button>
        {error && <p>{error}</p>}
      </form>
    );
  }

export default SignUpView;