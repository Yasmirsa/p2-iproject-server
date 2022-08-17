const { User, Course } = require("../models");

class TeacherController {
  static async addCourse(req, res, next) {
    try {
      const { title, description, duration, price } = req.body;
      const response = await Course.create({
        title,
        description,
        duration,
        price,
        UserId: req.user.id,
      });
      res.status(201).json({
        message: `successfully created new Course`,
        response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editCourse(req, res, next) {
    try {
      const { title, description, duration, price } = req.body;
      const { courseId } = req.params;

      const response = await Course.update(
        { title, description, duration, price },
        { where: { id: courseId } }
      );
      console.log(response);
      res.status(200).json({ message: `Course has been edited` });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCourse(req, res, next) {
    try {
      const { courseId } = req.params;
      let course = await Course.destroy({
        where: {
          id: courseId,
        },
      });
      if (!course) {
        throw { name: `NotFound` };
      } else {
        res.status(200).json({
          message: `Course is deleted`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TeacherController;
