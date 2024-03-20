import {Trace} from '../trace.ts'

export class FileTracker {
  files: Map<string, Trace>
  id: string

  constructor(opts: {id: string}) {
    this.files = new Map()
    this.id = opts.id
  }

  register(id: string): Trace {
    const tron = new Trace({id}).on()
    this.files.set(id, tron)
    return tron
  }

  get(id: string): Trace {
    const tron = this.files.get(id)

    if (tron == null) {
      throw new Error(`${id} transform tracker not registered`)
    }

    return tron
  }
}
