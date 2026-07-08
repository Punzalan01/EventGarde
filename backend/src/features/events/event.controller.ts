import type { Request, Response } from 'express'

export async function createEvent(req: Request, res: Response) {
  res.status(201).json({
    status: 'event_creation_allowed',
    message: 'Event creation access passed. Event persistence is outside this auth foundation task.',
    workspace: req.workspace,
  })
}
