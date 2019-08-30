import UsersModel from "../../models/UsersModel"
import ExceptionConfig from "../../configs/ExceptionConfig"
import HashPassword from "../../utils/HashPassword"

class UsersController {
    async index (req, res, next) {
        try {
            const users = await UsersModel.findByFullName(/av8899/)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: users
            })
        } catch (err) {
            next(err)
        }
    }

    async save (req, res, next) {
        try {
            const user = new UsersModel({
                username: req.body.username,
                password: HashPassword.hash("passpass"),

            });
            await user.save();
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                data: user
            })
        } catch (err) {
            next(err)
        }
    }

    async delete (req, res, next){
        const id = req.params.id;
        try {
            const user = await UsersModel.softDelete(id, res);
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_DELETE_SUCCESS,
                data: id
            })
        } catch (err) {
            next (err)
        }
    }

    async search (req, res, next) {
        // const username = req.params.name;
        try {
            const users = await UsersModel.findUserAndCount("Test API");
            return res.jsonSuccess({
                message: "Test Search user",
                data: users
            })
        } catch (err) {
            next(err)
        }
    }

    async detail (req, res, next) {
        try {
            return res.jsonSuccess({
                message: "You requested detail users controller",
                errors: "You requested detail users controller"
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new UsersController()