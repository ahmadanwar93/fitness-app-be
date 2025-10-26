const { Op } = require("sequelize");
const Member = require("../models/Member");

exports.getMembers = async (req, res, next) => {
  try {
    const { search, status, membershipType } = req.query;

    const where = {};

    if (search) {
      where[Op.or] = [
        { firstName: { [Op.like]: `%${search}%` } },
        { lastName: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (membershipType) {
      where.membershipType = membershipType;
    }

    const members = await Member.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (e) {
    next(e);
  }
};

exports.getMember = async (req, res, next) => {
  try {
    const member = await Member.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    next(error);
  }
};

exports.createMember = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      membershipType,
      joinedDate,
      status,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !membershipType ||
      !joinedDate
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: firstName, lastName, email, phone, membershipType, startDate",
      });
    }

    const member = await Member.create({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      membershipType,
      joinedDate,
      status: status,
    });

    res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: member,
    });
  } catch (error) {
    // For this, it seems better to do the email checking  on the database level, to avoid race condition,
    // and using single query instead of 2

    // But for clarity sake, i defintely love to check for unique email exists first
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "A member with this email already exists",
      });
    }
    next(error);
  }
};

exports.updateMember = async (req, res, next) => {
  try {
    const member = await Member.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      membershipType,
      startDate,
      status,
    } = req.body;

    const updateData = {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      membershipType,
      startDate,
      status,
    };

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    await member.update(updateData);

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: member,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        success: false,
        message: "A member with this email already exists",
      });
    }
    next(error);
  }
};

exports.deleteMember = async (req, res, next) => {
  try {
    const member = await Member.findByPk(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    await member.destroy();

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
