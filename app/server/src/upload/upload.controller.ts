import { Controller, Post, UploadedFile } from '@nestjs/common'
import { image } from './upload'
import { UploadService } from './upload.service'
import { normalizeAssetUrl } from '../common/asset-url'

@Controller('upload')
export class UploadController {
  constructor() { }


  @Post('image')
  @image()
  image(@UploadedFile() file: Express.Multer.File) {
    return {
      url: normalizeAssetUrl(file.path),
    }
  }
}
