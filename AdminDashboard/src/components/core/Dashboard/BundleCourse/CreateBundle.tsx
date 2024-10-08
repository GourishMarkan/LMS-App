import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import axios from "axios";
import { BASE_URL } from "../../../../services/apis";

import { Link, Router, useNavigate } from "react-router-dom";
import Step1 from "./StepOne.tsx";
import Step2 from "./Steptwo.tsx";

const Step3 = ({ register, setValue, errors, courseBundleId }) => {
  const [startDate, setStartDate] = React.useState("");
  const [isListed, setIsListed] = React.useState(false);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
    setValue("date", date);
  };

  const handleListedChange = (event) => {
    const checked = event.target.checked;
    setIsListed(checked);
    setValue("isListed", checked);
  };
  useEffect(() => {
    console.log(startDate, isListed);
  }, [startDate, isListed]);
  return (
    <div>
      <div className="space-y-8">
        <div className="flex gap-3">
          <label className="text-white">Publish Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleDateChange}
            className="form-control"
          />
          {errors.publishDate && (
            <div className="error">{errors.publishDate.message}</div>
          )}
        </div>
        <div className="flex gap-3">
          <label className="text-white"> Listed:</label>
          <input
            type="checkbox"
            checked={isListed}
            onChange={handleListedChange}
          />
          {errors.isListed && (
            <div className="error">{errors.isListed.message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CourseBundleForm() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [bundleImage, setBundleImage] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [courseBundleId, setCourseBundleId] = useState(null);

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);


  //   const { token } = useSelector((state) => state.auth);

  const handleImageChange = (e) => {
    setBundleImage(e.target.files[0]);
  };

  const handleStep1Submit = async (data) => {
    const formData = new FormData();
    formData.append("bundleName", data.bundleName);
    formData.append("image", bundleImage);
    formData.append("price", data.price);
    formData.append("aboutDescription", data.aboutDescription);

    try {
      toast.loading("Please wait...");
      const res = await axios.post(
        `${BASE_URL}/api/v1/bundle/course-bundle`,
        formData
      );
      console.log(res);
      console.log("🚀 ~ handleStep1Submit ~ res:", res?.data?._id);
      setCourseBundleId(res?.data?._id);

      toast.dismiss();
      toast.success("Step 1 completed successfully");

      setStep(2);
    } catch (error) {
      toast.error("Failed to complete Step 1", {
        duration: 2000,
      });
      console.log(error);
    }
  };

  const handleStep2Submit = async () => {
    const formData = getValues();
    console.log(formData.quizzes);

    console.log(selectedMaterials, "selectedMaterials");
    try {
      toast.loading("Please wait...");
      const res = await axios.post(
        `${BASE_URL}/api/v1/bundle/course-bundle/update/${courseBundleId}`,
        { quizzes: formData.quizzes }
      );

      const resp = await axios.post(
        `${BASE_URL}/api/v1/bundle/course-bundle-materials/${courseBundleId}`,
        {studyMaterials : selectedMaterials }
      )
      console.log(res);

      if (res.status != 200) {
        toast.dismiss();
        toast.error("Update failed");
        return;
      }
      console.log("🚀 ~ handleStep2Submit ~ res:", res?.data?._id);

      toast.dismiss();
      toast.success("Step 2 completed successfully");
      setStep(3);
    } catch (error) {
      toast.error("Failed to complete Step 2", {
        duration: 2000,
      });
      console.log(error);
    }
  };

  const handleStep3Submit = async (data) => {
    const formData = getValues();
    console.log(formData.date, formData.isListed, courseBundleId);
    try {
      toast.loading("Please wait...");
      const res = await axios.post(
        `${BASE_URL}/api/v1/bundle/course-bundle/updateTime/${courseBundleId}`,
        { date: formData.date, isListed: formData.isListed }
      );
      console.log(res);

      if (res.status != 200){
        toast.dismiss();
        toast.error("Update failed");
        return;
      }
        console.log("🚀 ~ handleStep2Submit ~ res:", res?.data?._id);
      setCourseBundleId(res?.data?._id);
      toast.dismiss();
      toast.success("Step 3 completed successfully");

      navigate("/dashboard/my-courses");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to complete Step 2", {
        duration: 2000,
      });
      console.log(error);
    }

    // Add publish and set time data to formData
    // const result = await publishCourseBundle(formData, token);
    // if (result) {
    // //   dispatch(setCourseBundle(result));
    //   toast.success("Course bundle published successfully");
    // } else {
    //   toast.error("Failed to publish course bundle");
    // }
  };

  const onSubmit = (data) => {
    if (step === 1) {
      handleStep1Submit(data);
    } else if (step === 2) {
      handleStep2Submit(data);
    } else if (step === 3) {
      handleStep3Submit(data);
    }
  };

  return (
    // <div className=" inset-0  !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 ">
    <div className="flex-1 w-full gap-x-6 justify-center items-center max-h-full">
      <div className="my-10 w-full rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {step === 1 && "Step 1: Initial Data Collection"}
            {step === 2 && "Step 2: Add Quizzes and Study Material"}
            {step === 3 && "Step 3: Publish and Set Time"}
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2  px-4 py-32 "
        >
          {step === 1 && (
            <Step1
              register={register}
              errors={errors}
              setValue={setValue}
              handleImageChange={handleImageChange}
            />
          )}
          {step === 2 && (
            <Step2
              {...register}
              register={register}
              getValues={getValues}
              setValue={setValue}
              courseBundleId={courseBundleId}
              selectedMaterials={selectedMaterials}
              setSelectedMaterials={setSelectedMaterials}
              errors={errors}
            />
          )}
          {step === 3 && (
            <Step3
              register={register}
              setValue={setValue}
              courseBundleId={courseBundleId}
              errors={errors}
            />
          )}
          <div className="flex justify-end">
            <IconBtn text={step === 3 ? "Submit" : "Next"} />
          </div>
        </form>
      </div>
    </div>
  );
}
