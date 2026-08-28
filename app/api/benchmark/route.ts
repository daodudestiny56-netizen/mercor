import { NextResponse } from 'next/server';
import { generateBenchmarkSuite } from '@/lib/evaluationEngine';

export async function GET() {
  try {
    const data = await generateBenchmarkSuite();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Benchmark execution failed.' }, { status: 500 });
  }
}
