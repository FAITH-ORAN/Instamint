import { boolean, number, object, string } from "zod"

export const minterProfileValidator = object({
  userId: number().int().positive(),
  language: string(),
})

export const followValidator = object({
  userIdA: number().int().positive(),
  userIdB: number().int().positive(),
})

export const updateminterProfileValidator = object({
  idMinter: number().int().positive(),
  picture: string().url().isOptional(),
  bio: string().isOptional(),
})

export const getminterIdProfileValidator = object({
  userId: string().refine(
    (data) => {
      const num = parseInt(data, 10)

      return !isNaN(num) && Number.isInteger(num) && num > 0
    },
    {
      message:
        "userId doit être une chaîne représentant un nombre entier positif.",
    },
  ),
})

export const visibilityProfileValidator = object({
  idMinter: number().int().positive(),
  visibility: boolean(),
})
