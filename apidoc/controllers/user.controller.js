import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';
import { Op } from 'sequelize';

import db from '../models';

import ResponseCodes from '../constants/statusCodes.constants';
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '../constants/pagination.constants';

import { userService } from '../services';

import usersTransformers from '../transformers/user';

import userHelper from '../helpers/user';
import { getStartIndex } from '../helpers/pagination.js';

const create = async (req, res) => {
  const User = db.User;

  try {
    if (!req.body.email && !req.body.password) {
      return res.status(ResponseCodes.BAD_REQUEST).send({ message: 'Required fields not sent' });
    }

    let user = await User.findOne({
      where: { email: req.body.email }
    });

    if (user) {
      return res.status(ResponseCodes.BAD_REQUEST).send({
        error: 'Bad Request',
        message: [{
          property: 'email',
          children: [],
          constraints: { isUnique: 'User already exists' }
        }],
        statusCode: ResponseCodes.BAD_REQUEST
      });
    }

    user = await userService.create(req.body);

    res.status(ResponseCodes.OK).send(userHelper.serialize(user));
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const update = async (req, res) => {
  const User = db.User;

  try {
    const { id } = req.params;
    let user = await User.findByPk(id);

    if (!user) {
      return res.status(ResponseCodes.NOT_FOUND).send({ message: 'User not found.' });
    }

    user = await userService.update(user, req.body);

    res.status(ResponseCodes.OK).send(userHelper.serialize(user));
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

// TODO: Remove queries if we don't need it
const getAll = async (req, res) => {
  const User = db.User;

  try {
    const {
      users,
      search,
      page = DEFAULT_PAGE,
      limit = DEFAULT_ITEMS_PER_PAGE,
      isCollapseFilter = false,
      sort = 'id',
      sortOrder = 'asc'
    } = req.query;
    let fullName;
    const offset = getStartIndex(page, limit);
    let options = { offset, limit: parseInt(limit), order: [['created_at', 'desc']] };
    if (search) {
      fullName = search.replace(/\s+/g, ' ').trim().split(' ');
    }

    if (users && users.length && search) {
      options = {
        ...options,
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { first_name: users },
                { last_name: users },
                { email: users }
              ]
            },
            {
              [Op.or]: [
                { first_name: { [Op.like]: `%${search.trim()}%` } },
                { last_name: { [Op.like]: `%${search.trim()}%` } },
                { email: { [Op.like]: `%${search.trim()}%` } },
                [{ first_name: { [Op.like]: `%${fullName[0]}%` }, last_name: { [Op.like]: `%${fullName[1]}%` } }]
              ]
            }
          ]
        }
      };
    } else if (users && users.length && !search) {
      options = {
        ...options,
        where: {
          [Op.or]: [
            { first_name: users },
            { last_name: users },
            { email: users }
          ]
        }
      };
    } else if (!users && search) {
      options = {
        ...options,
        where: {
          [Op.or]: [
            { first_name: { [Op.like]: `%${search.trim()}%` } },
            { last_name: { [Op.like]: `%${search.trim()}%` } },
            { email: { [Op.like]: `%${search.trim()}%` } },
            [{ first_name: { [Op.like]: `%${fullName[0]}%` }, last_name: { [Op.like]: `%${fullName[1]}%` } }]
          ]
        }
      };
    }

    options = {
      ...options,
      order: [['created_at', 'desc'], [sort, sortOrder.toLowerCase()]]
    };

    const usersData = await User.findAndCountAll(options);

    if (isCollapseFilter) {
      const data = usersTransformers.filterUsers(usersData.rows);

      return res.status(ResponseCodes.OK).send(data);
    }

    const data = usersData.rows.map(user => userHelper.serialize(user));

    res.status(ResponseCodes.OK).send({ items: data, total: usersData.count });
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const getList = async (req, res) => {
  const User = db.User;

  try {
    const {
      users,
      search,
      page = DEFAULT_PAGE,
      limit = DEFAULT_ITEMS_PER_PAGE,
      isCollapseFilter = false,
      sort = 'id',
      sortOrder = 'asc'
    } = req.query;
    let fullName;
    const offset = getStartIndex(page, limit);
    let options = { offset, limit: parseInt(limit), order: [['created_at', 'desc']] };
    if (search) {
      fullName = search.replace(/\s+/g, ' ').trim().split(' ');
    }

    if (users && users.length && search) {
      options = {
        ...options,
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { first_name: users },
                { last_name: users },
                { email: users }
              ]
            },
            {
              [Op.or]: [
                { first_name: { [Op.like]: `%${search.trim()}%` } },
                { last_name: { [Op.like]: `%${search.trim()}%` } },
                { email: { [Op.like]: `%${search.trim()}%` } },
                [{ first_name: { [Op.like]: `%${fullName[0]}%` }, last_name: { [Op.like]: `%${fullName[1]}%` } }]
              ]
            }
          ]
        }
      };
    } else if (users && users.length && !search) {
      options = {
        ...options,
        where: {
          [Op.or]: [
            { first_name: users },
            { last_name: users },
            { email: users }
          ]
        }
      };
    } else if (!users && search) {
      options = {
        ...options,
        where: {
          [Op.or]: [
            { first_name: { [Op.like]: `%${search.trim()}%` } },
            { last_name: { [Op.like]: `%${search.trim()}%` } },
            { email: { [Op.like]: `%${search.trim()}%` } },
            [{ first_name: { [Op.like]: `%${fullName[0]}%` }, last_name: { [Op.like]: `%${fullName[1]}%` } }]
          ]
        }
      };
    }

    options = {
      ...options,
      order: [['created_at', 'desc'], [sort, sortOrder.toLowerCase()]]
    };

    const usersData = await User.findAndCountAll(options);

    if (isCollapseFilter) {
      const data = usersTransformers.filterUsers(usersData.rows);

      return res.status(ResponseCodes.OK).send(data);
    }

    const data = usersData.rows.map(user => userHelper.serialize(user));

    res.status(ResponseCodes.OK).send({ items: data, total: usersData.count });
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const get = async (req, res) => {
  const User = db.User;

  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(ResponseCodes.OK).send([]);
    }

    res.status(ResponseCodes.OK).send(userHelper.serialize(user));
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const remove = async (req, res) => {
  const User = db.User;

  try {
    const { id } = req.params;

    // @TODO: this will be moved separate in Log Service

    // let hasPermission = false;

    // const headers = {
    //     'x-access-token': req.headers['x-access-token']
    // };

    // const loggedUser = await SSOService.getUser(headers);
    // const userRoles = await UserRole.getUserRoles(loggedUser.decoded.id, headers);

    // userRoles.forEach(userRole => {
    //     userRole.role.actions.forEach(action => {
    //         if (action.name === 'Delete users') {
    //             hasPermission = true;
    //         }
    //     });
    // });

    if (id) {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(ResponseCodes.NOT_FOUND).send({ message: 'User not found.' });
      }

      // await NotificationService.clearAll(id, headers);
      // await UserRole.removeUserRoleByUserId(id, headers);
      await User.destroy({ where: { id: id } });

      // await userHelper.createLog(
      //     `Delete event for the user with id ${id} was completed successfully.`,
      //     'User Service',
      //     req
      // );

      return res.status(ResponseCodes.OK).send({ message: 'User successfully deleted' });
    }

    res.status(ResponseCodes.BAD_REQUEST).send({ message: 'You dont have permission to delete this user' });
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const authentication = async (req, res) => {
  const User = db.User;

  try {
    if (!req.body.email && !req.body.password) {
      return res.status(ResponseCodes.BAD_REQUEST).send({ message: 'Required fields not sent' });
    }

    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) {
      return res.status(ResponseCodes.NOT_FOUND).send({ message: 'Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(ResponseCodes.UNAUTHORIZED).send({ message: 'Invalid email or password.' });
    }

    res.status(ResponseCodes.OK).send(userHelper.serialize(user));
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const recoverPassword = async (req, res) => {
  const User = db.User;

  try {
    if (!req.body.email) {
      return res.status(ResponseCodes.BAD_REQUEST).send({ message: 'Email field is required' });
    }

    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) {
      return res.status(ResponseCodes.NOT_FOUND).send({ message: 'User not found.' });
    }

    const validUntil = new Date();
    validUntil.setHours(validUntil.getHours() + 24);

    // TODO: move this in a utils (this encryption is an URL safe encryption)
    const values = { userId: user.id, validUntil };
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(values), process.env.APP_SECRET).toString();
    var base64Encryption = CryptoJS.enc.Base64.parse(encrypted);
    var token = base64Encryption.toString(CryptoJS.enc.Hex);

    user.password_recovery_hash = token;
    await user.save();

    res.status(ResponseCodes.OK).send({ token: user.password_recovery_hash });
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    let decryptedValue;

    // TODO: move this in a utils (this encryption is an URL safe encryption)
    var decoded = CryptoJS.enc.Hex.parse(token);
    var decodedBase64 = decoded.toString(CryptoJS.enc.Base64);

    const decrypted = CryptoJS.AES.decrypt(decodedBase64, process.env.APP_SECRET);

    try {
      decryptedValue = decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      decryptedValue = '';
    }

    if (!decryptedValue) {
      return res.status(ResponseCodes.BAD_REQUEST).send({ message: 'Invalid or expired token' });
    }

    const tokenData = JSON.parse(decryptedValue);
    const now = new Date();

    if (now.getTime() > Date.parse(tokenData.validUntil)) {
      return res.status(ResponseCodes.BAD_REQUEST).send({ message: 'Invalid or expired token' });
    }

    res.status(ResponseCodes.OK).send({ id: tokenData.userId });
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  const User = db.User;

  try {
    const { id } = req.params;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(ResponseCodes.NOT_FOUND).send({ message: 'User not found.' });
    }

    if (!req.body.password) {
      return res.status(ResponseCodes.BAD_REQUEST).send({ message: 'No password provided' });
    }

    if (req.body.currentPassword) {
      const match = await bcrypt.compare(req.body.currentPassword, user.password);

      if (!match) {
        return res.status(ResponseCodes.BAD_REQUEST).send({ message: 'Invalid current password' });
      }
    }

    user.password = bcrypt.hashSync(req.body.password);
    await user.save();

    res.status(ResponseCodes.OK).send();
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const changeEmail = async (req, res) => {
  const User = db.User;

  try {
    const { id } = req.params;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(ResponseCodes.NOT_FOUND).send({ message: 'User not found.' });
    }

    if (!req.body.email) {
      return res.status(ResponseCodes.BAD_REQUEST).send({ message: 'No email provided' });
    }

    user.email = req.body.email;
    await user.save();

    res.status(ResponseCodes.OK).send();
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const User = db.User;

  try {
    const { recoveryHash } = req.query;

    let user = await User.findOne({ where: { password_recovery_hash: recoveryHash } });

    if (!user) {
      return res.status(ResponseCodes.NOT_FOUND).send({ message: 'User not found.' });
    }

    user = await userService.changePassword(user, req.body);

    res.status(ResponseCodes.OK).send({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(ResponseCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

export default {
  create,
  update,
  getAll,
  get,
  remove,
  authentication,
  recoverPassword,
  verifyToken,
  changePassword,
  resetPassword,
  changeEmail,
  getList
};
