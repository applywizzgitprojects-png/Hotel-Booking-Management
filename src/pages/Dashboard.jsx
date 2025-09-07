// src/pages/Dashboard.jsx
import styled, { keyframes } from "styled-components";

/* ----------------------- helpers ----------------------- */
const fmtCurr = (n) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(
    Number(n || 0)
  );

/* Demo data – replace with real values from your queries */
const demo = {
  totalBookings: 42,
  cabins: 12,
  guests: 35,
  occupancy: 0.78, // 78%
  revenueThisMonth: 12650,
  revenuePrevMonth: 10180,
  activity: [
    { id: 1, label: "New booking • Cabin 08", time: "2m ago" },
    { id: 2, label: "Payment received • $420", time: "18m ago" },
    { id: 3, label: "Guest checked-in • Anna L.", time: "1h ago" },
    { id: 4, label: "Cancellation • BK-2139", time: "3h ago" },
  ],
};

/* ----------------------- animations ----------------------- */
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

/* ----------------------- layout ----------------------- */
const Page = styled.div`
  display: grid;
  gap: 1.6rem;
`;

const Title = styled.h2`
  margin: 0;
  font-weight: 800;
  letter-spacing: 0.2px;
  background: linear-gradient(90deg, #111827, #334155, #0ea5e9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

/* KPI cards */
const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  position: relative;
  background: var(--color-grey-0, #fff);
  border: 1px solid var(--color-grey-100, #e5e7eb);
  border-radius: 16px;
  padding: 1.2rem 1.2rem 1rem;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.05);
  overflow: hidden;
`;

const CardTitle = styled.div`
  font-size: 0.9rem;
  color: var(--color-grey-600, #64748b);
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => p.color || "#0ea5e9"};
  box-shadow: 0 0 0 4px ${(p) => (p.color ? `${p.color}22` : "#0ea5e922")};
`;

const CardValue = styled.div`
  margin-top: 0.25rem;
  font-size: clamp(1.6rem, 2.6vw, 2rem);
  font-weight: 800;
  letter-spacing: 0.2px;
  color: var(--color-grey-900, #0f172a);
`;

const RingWrap = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.8rem;
`;

const Ring = styled.div`
  --size: 54px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background:
    conic-gradient(#22c55e ${(p) => p.value * 360}deg, #e2e8f0 0deg),
    radial-gradient(#fff 56%, transparent 58%);
  animation: ${pulse} 2.8s ease-in-out infinite;
`;

const RingText = styled.div`
  font-weight: 700;
  color: #059669;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: 1rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: var(--color-grey-0, #fff);
  border: 1px solid var(--color-grey-100, #e5e7eb);
  border-radius: 16px;
  padding: 1.2rem;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.05);
`;

const PanelTitle = styled.h3`
  margin: 0 0 0.8rem 0;
  font-size: 1rem;
  color: var(--color-grey-800, #1f2937);
`;

const ActivityList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.6rem;
`;

const ActivityItem = styled.li`
  display: grid;
  grid-template-columns: 14px 1fr auto;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.4rem;
  border-radius: 10px;
  background: linear-gradient(
    90deg,
    rgba(241, 245, 249, 0.7),
    rgba(241, 245, 249, 0.35)
  );
`;

const Bullet = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #94a3b8;
`;

const RevenueCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.6rem;
`;

const BarRow = styled.div`
  height: 44px;
  background: linear-gradient(
    90deg,
    #0ea5e9,
    #22c55e,
    #a78bfa,
    #0ea5e9,
    #22c55e
  );
  background-size: 220% 100%;
  border-radius: 10px;
  animation: ${shimmer} 6s linear infinite;
`;

const Small = styled.span`
  font-size: 0.86rem;
  color: var(--color-grey-600, #64748b);
`;

const Subtle = styled.div`
  font-size: 0.82rem;
  color: var(--color-grey-500, #6b7280);
`;

/* ----------------------- component ----------------------- */
export default function Dashboard() {
  const {
    totalBookings,
    cabins,
    guests,
    occupancy,
    revenueThisMonth,
    revenuePrevMonth,
    activity,
  } = demo;

  const diff =
    revenuePrevMonth > 0
      ? ((revenueThisMonth - revenuePrevMonth) / revenuePrevMonth) * 100
      : 0;

  return (
    <Page>
      <Title>Dashboard</Title>

      <KPIGrid>
        <Card>
          <CardTitle>
            <Dot color="#0ea5e9" />
            Total bookings
          </CardTitle>
          <CardValue>{totalBookings}</CardValue>
        </Card>

        <Card>
          <CardTitle>
            <Dot color="#a78bfa" />
            Cabins
          </CardTitle>
          <CardValue>{cabins}</CardValue>
        </Card>

        <Card>
          <CardTitle>
            <Dot color="#22c55e" />
            Guests
          </CardTitle>
          <CardValue>{guests}</CardValue>
        </Card>

        <Card>
          <CardTitle>
            <Dot color="#f59e0b" />
            Occupancy
          </CardTitle>
          <RingWrap>
            <Ring value={occupancy} />
            <div>
              <CardValue style={{ lineHeight: 1 }}>
                {(occupancy * 100).toFixed(0)}%
              </CardValue>
              <RingText>this month</RingText>
            </div>
          </RingWrap>
        </Card>
      </KPIGrid>

      <Row>
        <Panel>
          <PanelTitle>Activity</PanelTitle>
          <ActivityList>
            {activity.map((a) => (
              <ActivityItem key={a.id}>
                <Bullet />
                <span>{a.label}</span>
                <Small>{a.time}</Small>
              </ActivityItem>
            ))}
          </ActivityList>
        </Panel>

        <RevenueCard>
          <CardTitle>
            <Dot color="#0ea5e9" />
            Revenue (this month)
          </CardTitle>
          <CardValue>{fmtCurr(revenueThisMonth)}</CardValue>
          <Small style={{ marginTop: "-0.4rem" }}>
            Prev. month: {fmtCurr(revenuePrevMonth)} •{" "}
            <strong
              style={{
                color: diff >= 0 ? "#16a34a" : "#ef4444",
                fontWeight: 700,
              }}
            >
              {diff >= 0 ? "+" : ""}
              {diff.toFixed(1)}%
            </strong>
          </Small>
          <BarRow />
          <Subtle>Replace this with your chart.</Subtle>
        </RevenueCard>
      </Row>
    </Page>
  );
}
