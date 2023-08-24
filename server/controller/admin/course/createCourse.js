const Course = require("../../../models/course.js");

exports.createCourse = async (req, res, next) => {
  const alreadyExist = await Course.findOne({ title: req.body.title });
  if (!alreadyExist) {
    const create = await Course({
      title: req.body.title,
    });
    if (create) {
      create.save();

      res.json({
        status: "success",
        message: "Your course has created successfully ID : " + create._id,
      });
    } else {
      res.json({ status: "error", message: "Something went wrong" });
    }
  } else {
    res.json({ status: "error", message: "Course already available" });
  }
};

exports.createCourseTopic = async (req, res, next) => {
  const edit = await Course.findOne({ _id: req.body.id });
  if (edit) {
    edit.collections.push({
      type: "topic",
      topic: [
        {
          title: req.body.data.title,
          id: req.body.data._id,
        },
      ],
    });
    edit.save();
    console.log(edit);

    res.json({
      status: "success",
      message: `Topic create successfully  ${edit._id} `,
    });
  }
};

exports.createCourseGroup = async (req, res, next) => {
  const edit = await Course.findOne({ _id: req.body.id });
  if (edit) {
    edit.collections.push({
      type: "group",
      title: req.body.groupName,
    });
    edit.save();

    res.json({
      status: "success",
      message: `group create successfully  ${edit._id} `,
    });
  } else {
    res.json({ status: "error", message: `something wrong ` });
  }
};

exports.createGroupTopic = async (req, res, next) => {
  const edit = await Course.findOne({ _id: req.body.id });
  if (edit) {
    edit.collections.filter((task) => {
      if (task._id == req.body.groupID) {
        task.topic.push({
          title: req.body.data.title,
          id: req.body.data._id,
        });
      }
    });
    edit.save();
    res.json({
      status: "success",
      message: `Group topic create successfully  ${edit._id} `,
    });
  }
};

exports.createCourseMock = async (req, res, next) => {
  const create = await Course.findOne({ _id: req.body.id });
  if (create) {
    // req.body.course.map(task => task.topic.map(task => console.log(task)))
    create.collections = [];
    create.collections = req.body.course;
    create.mockUpdate = true;
    create.save();
    res.json({
      status: "success",
      message: `Create mock test successfully  ${create._id}`,
    });
  } else
    res.json({
      status: "error",
      message: `Something wrong`,
    });
};

exports.createCourseDuration = async (req, res, next) => {
  const create = await Course.findOne({ _id: req.body.id });
  if (create) {
    console.log(req.body.course);
    create.mark = req.body.course.mark;
    create.negativeMark = req.body.course.negativeMark;
    create.duration = req.body.course.duration;
    create.lowPercentage = req.body.course.lowPercentage;
    create.mediumPercentage = req.body.course.mediumPercentage;
    create.highPercentage = req.body.course.highPercentage;
    create.save();
    res.json({
      status: "success",
      message: `Create test setting successfully  ${create._id} `,
    });
  } else
    res.json({
      status: "error",
      message: `Something wrong`,
    });
};
