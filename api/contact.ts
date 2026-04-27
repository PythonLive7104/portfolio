import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

type ContactBody = {
  name?: string
  email?: string
  company?: string
  message?: string
}

function parseBody(req: VercelRequest): ContactBody {
  const raw = req.body
  if (raw == null) return {}
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as ContactBody
    } catch {
      return {}
    }
  }
  if (typeof raw === 'object') return raw as ContactBody
  return {}
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    return res.status(500).json({ error: 'Email is not configured on the server' })
  }

  const body = parseBody(req)
  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const company = String(body.company ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  const resend = new Resend(apiKey)
  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `Portfolio inquiry from ${name}`,
    text: [name && `Name: ${name}`, email && `Email: ${email}`, company && `Company: ${company}`, '', message]
      .filter(Boolean)
      .join('\n'),
  })

  if (error) {
    return res.status(502).json({ error: error.message })
  }

  return res.status(200).json({ ok: true, id: data?.id })
}
