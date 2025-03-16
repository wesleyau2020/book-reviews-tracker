import { useState } from "react";
import { LinearProgress, Tooltip } from "@mui/material";
import ProgressModal from "./ProgressModal";

const ProgressCell = ({ params, onUpdate }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title={`${params.value}%`} arrow>
        <div
          // Enable double-click if value is less than 100%
          onDoubleClick={params.value !== 100 ? () => setOpen(true) : null}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            cursor: params.value === 100 ? "not-allowed" : "pointer",
            width: "100%",
          }}
        >
          <LinearProgress
            variant="determinate"
            value={params.value}
            sx={{ width: "100%" }}
          />
        </div>
      </Tooltip>

      {/* Progress Modal */}
      <ProgressModal
        open={open}
        onClose={() => setOpen(false)}
        bookId={params.id}
        currentProgress={params.value}
        onProgressUpdate={onUpdate}
      />
    </>
  );
};

export default ProgressCell;
