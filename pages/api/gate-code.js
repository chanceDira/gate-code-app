import { getSession } from "next-auth/react"

export default async function handler(req, res) {
    res.status(200).json({ name: 'devCode', data: Math.floor(Math.random() * 200) + 1 })
}
