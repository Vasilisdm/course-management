import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall } from "./apiStatusActions";

function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course: course };
}

function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course: course };
}

export function loadCourses() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi
            .getCourses()
            .then((courses) => {
                dispatch(loadCoursesSuccess(courses));
            })
            .catch((error) => {
                throw error;
            });
    };
}

export function saveCourse(course) {
    return function (dispatch) {
        dispatch(beginApiCall());
        return courseApi.saveCourse(course).then((savedCourse) => {
            course.id
                ? dispatch(updateCourseSuccess(savedCourse))
                : dispatch(createCourseSuccess(savedCourse));
        });
    };
}
