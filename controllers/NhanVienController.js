const NhanVienModel = require('../models/NhanVien')

const NhanVien = {
    DangKyNhanVien: async (req, res) => {
        const NhanVien = new NhanVienModel(req.body)
        try {
            await NhanVien.save()
            res.status(200).json(NhanVien)
        } catch (error) {
            res.status(502).json(error)
        }
    },
    GetNhanVien: async (req, res) => {
        const NV = await NhanVienModel.find({});
        try {
            res.status(200).json(NV)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    GetNhanVienbysdt: async (req, res) => {
      const { sdt } = req.params;
      try {
          const NV = await NhanVienModel.find({ SDT: sdt });
          res.send(NV);
      } catch (error) {
          res.status(502).send(error);
      }
  },
    UpdateNhanVien: async (req, res) => {
        const { sdt } = req.params;
        try {
            const NV = await NhanVienModel.findOneAndUpdate({ SDT: sdt }, req.body);
            await NV.save();
            res.send(NV);
        } catch (error) {
            res.status(502).send(error);
        }
    },
    DeleteNhanVienbySDT: async (req, res) => {
        const {sdt} = req.params;
        try {
          const SoDienThoai = await NhanVienModel.findOneAndDelete({ SDT: sdt });
          if (!SoDienThoai) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
          }
          return res.status(200).json({ message: 'Xóa nhân viên thành công' });
        } catch (err) {
          console.error(err.message);
          return res.status(500).json({ message: 'Lỗi server' });
        }
    },
    SearchNhanVien: async (req, res) => {
        const { sk } = req.params;
        try {
          const NV = await NhanVienModel.find({
            $or: [
              { HOTEN: { $regex: sk, $options: 'i' } },
              { SDT: { $regex: sk, $options: 'i' } },
              { EMAIL: { $regex: sk, $options: 'i' } },
            ],
          });
          res.send(NV);
        } catch (error) {
          res.status(500).send(error);
        }
    }
}

module.exports = NhanVien