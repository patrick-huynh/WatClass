"use client";

import Link from 'next/link';
import Button from "./Button";


export default function GetFormButton() {
  return (
    <div>
      <Link href="/recommendation-form">
        <Button title="Get recommendations" onClick={() => {}} />
      </Link>
    </div>
  );
}
