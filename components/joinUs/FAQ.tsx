const faqData = [
  {
    question: 'How do I become a member?',
    answer: 'Membership is open to all UofT students. Join our Discord or sign up for our newsletter!',
  },
  {
    question: 'Are there any fees for joining?',
    answer: 'No, membership is completely free.',
  },
  {
    question: 'How can I stay updated on events?',
    answer: 'Follow us on social media and check our newsletter for updates.',
  },
];

const FAQ: React.FC = () => (
  <div className="space-y-4">
    {faqData.map((item, index) => (
      <details key={index} className="bg-gray-800 text-white p-4 rounded-md">
        <summary className="cursor-pointer font-semibold">{item.question}</summary>
        <p className="mt-2">{item.answer}</p>
      </details>
    ))}
  </div>
);

export default FAQ;
