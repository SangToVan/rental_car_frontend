export default function RentalTerms() {
  return (
    <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-800">Điều khoản</h3>

      <ul className="pl-5 space-y-2 text-sm text-gray-600 list-disc">
        <li>
          Quy định khác:
          <ul className="pl-5 space-y-1 list-disc">
            <li>Sử dụng xe đúng mục đích.</li>
            <li>
              Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
            </li>
            <li>Không sử dụng xe thuê để cầm cố, thế chấp.</li>
            <li>Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</li>
          </ul>
        </li>
      </ul>

      <button className="mt-4 text-sm font-medium text-green-600 hover:text-green-700">
        Xem thêm
      </button>
    </div>
  );
}
