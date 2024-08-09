import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../../services/apis";
import { useForm } from "react-hook-form";

const Step2 = ({ register, errors, courseBundleId }: any) => {
    const { setValue,getValues} = useForm();

    console.log(courseBundleId, 'step-2')
    const [courses, setCourses] = useState([]);
    const [studyMaterials, setstudyMaterials] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                toast.loading("fetching data...")
                // const coursesRes = await axios.get(`${BASE_URL}/api/v1/courses`);
                const studyRes = await axios.get(`${BASE_URL}/api/v1/study/getIsBundledMaterials`);
                const quizzesRes = await axios.get(`${BASE_URL}/api/v1/quiz/getAllisBundleQuizes`);

                // setCourses(coursesRes.data);
                setQuizzes(quizzesRes.data.data);
                setstudyMaterials(studyRes.data.data);


                //TODO only which as isBundle

                toast.dismiss();

                console.log("🚀 ~ fetchData ~ studyRes:", studyRes)
                console.log("🚀 ~ fetchData ~ quizzesRes:", quizzesRes)
                
            } catch (error) {
                toast.dismiss();
                toast.error("Failed to fetch data");
                console.log(error);
            }
               
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (e, item) => {
        if (e.target.checked) {
            console.log(item._id,'checked')
            setSelectedItems((prev) => [...prev, item._id]);
        } else {
            console.log(item._id,'unchecked')
            setSelectedItems(selectedItems.filter(i => i !== item._id));
            
        }
        // formData.selectedItems = selectedItems;
        setValue("selectQuizes", selectedItems);
    };


    const formData = getValues();       
    console.log(formData)
    console.log(selectedItems)

//yeh wali
    return (
        <div className="flex-1 h-full">
            <h2>Select Courses and Quizzes</h2>
        <div className="flex flex-col gap-20 justify-center items-center">
            <div>
                <h3>Courses</h3>

                {studyMaterials.length > 0  && studyMaterials?.map(material => (
                    <div key={material._id}>
                        <input
                            type="checkbox"
                            id={`course-${material._id}`}
                            onChange={(e) => handleCheckboxChange(e, course)}
                        />
                        <label htmlFor={`course-${material.id}?`}>{material.title}</label>
                    </div>
                ))}
            </div>

            <div>
                <h3>Courses</h3>

                {/* {courses.map(course => (
                    <div key={course.id}>
                        <input
                            type="checkbox"
                            id={`course-${course.id}`}
                            onChange={(e) => handleCheckboxChange(e, course)}
                        />
                        <label htmlFor={`course-${course.id}`}>{course.name}</label>
                    </div>
                ))} */}
            </div>

            <div>
                <h3>Quizzes</h3>
                {quizzes.length > 0  && quizzes?.map(quiz => (
                    <div key={quiz?._id}>
                        <input
                            type="checkbox"
                            id={`quiz-${quiz._id}`}
                            onChange={(e) => handleCheckboxChange(e, quiz)}
                        />
                        <label htmlFor={`quiz-${quiz._id}`}>{quiz.name}</label>
                    </div>
                ))}
            </div>
            {errors.selectedItems && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Please select at least one item
                </span>
            )}
        </div>
        </div>
    );
};

export default Step2;