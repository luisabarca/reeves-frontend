import React from "react";
import { Switch } from "@nextui-org/react";
import { fetchStart } from "./store/reducers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, formSchema } from "./form-schema";
import { useAppDispatch, useAppSelector } from "./store";
import "./index.css";

function App() {
  const isLoading = useAppSelector((state) => state.matrix.loading);
  const imageUrl = useAppSelector((state) => state.matrix.url);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      width: 240,
      height: undefined,
      young: false,
      grayscale: false,
    },
    mode: "onChange",
  });

  const handleValidForm = (data: FormSchema) => {
    dispatch(fetchStart(data));
  };

  const { width, height } = getValues();

  const hasSizeError = !!errors.width?.message || width < 1;

  // Fallback to width for square image
  const fixedHeight = !height || Math.abs(height) < 1 ? width : height;

  return (
    <div className="container mx-auto">
      <div className="w-full flex flex-col h-screen">
        <div className="flex-col p-2">
          <h1 className="text-3xl my-2 font-bold">Keanu Reeves images</h1>

          <form onSubmit={handleSubmit(handleValidForm)} noValidate nonce="">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5 md:gap-4 items-center">
              <div>
                <input
                  type="number"
                  {...register("width", {
                    valueAsNumber: true,
                  })}
                  min={0}
                  placeholder="Width"
                  className={[
                    "border-2 border-gray-500 w-full rounded-md p-2",
                    hasSizeError
                      ? "border-red-500 placeholder-red-400"
                      : "border-0",
                  ].join(" ")}
                />
                {hasSizeError && (
                  <p className="text-red-600 text-xs absolute">
                    Please provide the image width
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  {...register("height")}
                  min={0}
                  placeholder="Height"
                  className="border-2 border-gray-500 w-full rounded-md p-2"
                />
              </div>
              <div>
                <Switch
                  onValueChange={(isSelected: boolean) => {
                    setValue("young", isSelected);
                  }}
                  size="lg"
                  {...register("young")}
                >
                  Young
                </Switch>
              </div>
              <div>
                <Switch
                  size="lg"
                  onValueChange={(isSelected: boolean) => {
                    setValue("grayscale", isSelected);
                  }}
                  {...register("grayscale")}
                >
                  Grayscale
                </Switch>
              </div>
              <button
                type="submit"
                className="text-lg bg-black text-white flex w-full self-center mx-auto p-2 md:my-6 rounded-md text-center justify-center"
              >
                Get Image
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-wrap flex-1 justify-center content-center bg-slate-200 border-dotted border-2 border-gray-400 p-4">
          {!isLoading && imageUrl.length > 0 && (
            <img
              src={imageUrl}
              width={width}
              height={fixedHeight}
              className="rounded-md"
              alt="Keanu Reeves"
            />
          )}
          {imageUrl.length < 1 && !isLoading && (
            <div className="flex flex-col justify-center">
              <img src="/images/empty-state.svg" alt="" className="flex self-center w-1/2" />
              <p className="text-medium">
              Set image size and extra options above, then click on the <strong>Get Image</strong> button
              </p>
            </div>
          )}
          {isLoading && (
            <div className="text-3xl font-semibold">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
