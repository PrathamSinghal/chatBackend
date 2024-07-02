import { check,param, query } from "express-validator";
import { enumType, _infoMessaage } from "../utils/responseMessage";
import { PdfService } from "../services/pdf.service";



const regexImage = /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );

export const getPdfData = [
    param('id').notEmpty().withMessage(_infoMessaage.required()).custom(async (value: string) => {
        return PdfService.findOne({ _id: value}).then((data) => {
            if (!data) throw new Error(_infoMessaage.invalidId(value))
        }).catch((err) => {
            throw new Error(_infoMessaage.invalidId(value))
        })
    }),
]