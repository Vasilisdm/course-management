import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({
    courses,
    authors,
    loadCourses,
    loadAuthors,
    ...props
}) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (courses.length === 0) {
            loadCourses().catch((error) => {
                alert("Loading courses failed" + error);
            });
        }

        if (authors.length === 0) {
            loadAuthors().catch((error) => {
                alert("Loading authors failed" + error);
            });
        }
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse((previousCourse) => ({
            ...previousCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value,
        }));
    }

    return (
        <CourseForm
            course={course}
            authors={authors}
            errors={errors}
            onChange={handleChange}
        />
    );
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        course: newCourse,
        courses: state.courses,
        authors: state.authors,
    };
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
