import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Chapter } from '../chapter/entities/chapter.entity';
import { Note } from '@prisma/client';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async create(data: { note: CreateNoteDto; chapter: Chapter }) {
    console.log(data);
    let note: Note;
    try {
      note = await this.prisma.note.create({
        data: {
          ...data.note,
          chapter: {
            connect: {
              id: data.chapter.id,
            },
          },
        },
      });
      //vérifier que l'utilisateur existe/a les droits
      return { noteId: note.id, code: 201, message: 'success' };
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        {
          status: HttpStatus.CONFLICT,
          error: 'cannot create note',
        },
        HttpStatus.CONFLICT as unknown as string,
      );
    }
  }

  findAll() {
    return `This action returns all note`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
