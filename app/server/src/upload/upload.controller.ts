import { Controller, Post, UploadedFile } from '@nestjs/common'
import { image } from './upload'
import { UploadService } from './upload.service'
import { ConfigService } from '@nestjs/config'

@Controller('upload')
export class UploadController {
  constructor(private config: ConfigService) { }


  @Post('image')
  @image()
  image(@UploadedFile() file: Express.Multer.File) {
    return {
      url: `http://${this.config.get('URL')}:${this.config.get('PORT')}/${file.path}`,
    }
  }
}
