import mysql from '../mysql'
import { Announcement } from '../entity/Announcement'
import { nullableFuzzy } from '../Util'
class AnnouncementService {

  async find(req) {
    let { page, size, announcementTitle } = req
    if (page == null) {
      page = 0
    }
    if (size == null) {
      size = 10
    }
    const Announcements = await mysql.getRepository(Announcement).createQueryBuilder("anno")
      .where("anno.announcementTitle like :name", { name: nullableFuzzy(announcementTitle) })
      .orderBy("anno.announcementDate", "DESC")
      .addOrderBy("anno.announcementTime", "DESC")
      .skip(page * size)
      .take(size).getManyAndCount()
    return { result: true, records: Announcements[0], total: Announcements[1] }
  }
  async save(item: Announcement) {
    await mysql.getRepository(Announcement).save({ ...item });
    return { result: true, msg: "更新成功" };
  }
  async del(item: Announcement) {
    if (item != null && item.announcementId != null) {
      const result = await mysql.getRepository(Announcement).remove(item);
      return { result: true };
    } else {
      return { result: false, msg: '删除信息获取失败' };
    }
  }
}
export default new AnnouncementService()