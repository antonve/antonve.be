import { Header } from '@/app/Header'
import Head from 'next/head'
import Link from 'next/link'

type Book = {
  yearRead: number | 'Unknown'
  title: string
  url: string
  reviewUrl?: string
}

const books: Book[] = [
  {
    yearRead: 2026,
    title: 'Generative AI on Kubernetes: Operationalizing Large Language Models',
    url: 'https://openlibrary.org/isbn/9781098171926',
  },
  {
    yearRead: 2026,
    title: 'Continuous Deployment: Enable Faster Feedback, Safer Releases, and More Reliable Software',
    url: 'https://openlibrary.org/isbn/9781098146726',
  },
  {
    yearRead: 2025,
    title: 'Cloud Native Application Protection Platforms: A Guide to CNAPPs and the Foundations of Comprehensive Cloud Security',
    url: 'https://openlibrary.org/isbn/9781098141707',
  },
  {
    yearRead: 2025,
    title: 'The Software Engineer\'s Guidebook: Navigating senior, tech lead, and staff engineer positions at tech companies and startups',
    url: 'https://openlibrary.org/isbn/9789083381824',
  },
  {
    yearRead: 2025,
    title: 'Vibe Coding: Building Production-Grade Software With GenAI, Chat, Agents, and Beyond',
    url: 'https://openlibrary.org/isbn/9781966280026',
  },
  {
    yearRead: 2025,
    title: 'The Staff Engineer\'s Path: A Guide for Individual Contributors Navigating Growth and Change',
    url: 'https://openlibrary.org/isbn/9781098118730',
  },
  {
    yearRead: 2025,
    title: 'Production Kubernetes: Building Successful Application Platforms',
    url: 'https://openlibrary.org/isbn/9781492092308',
  },
  {
    yearRead: 2025,
    title: 'Platform Engineering: A Guide for Technical, Product, and People Leaders',
    url: 'https://openlibrary.org/isbn/9781098153649',
  },
  {
    yearRead: 2025,
    title: 'Software Architecture: The Hard Parts: Modern Trade-Off Analyses for Distributed Architectures',
    url: 'https://openlibrary.org/isbn/9781492086895',
  },
  {
    yearRead: 2025,
    title: '事例でわかるMLOps 機械学習の成果をスケールさせる処方箋',
    url: 'https://www.kspub.co.jp/book/detail/5369562.html',
  },
  {
    yearRead: 2024,
    title: 'Understanding Distributed Systems: What every developer should know about large distributed applications',
    url: 'https://understandingdistributed.systems/',
  },
  {
    yearRead: 2023,
    title: '「パラレルインカム」のはじめ方 私たちの新しい「お金と生き方」の選択肢',
    url: 'https://d21.co.jp/book/detail/978-4-7993-2827-9',
  },
  {
    yearRead: 2023,
    title: 'Modern CSS with Tailwind Flexible Styling without the Fuss',
    url: 'https://openlibrary.org/isbn/9781680508185',
  },
  {
    yearRead: 2022,
    title: 'Elements of Programming Interviews in Python: The Insiders\' Guide',
    url: 'https://openlibrary.org/isbn/9781537713946',
  },
  {
    yearRead: 2022,
    title: '東京で家を買うなら',
    url: 'https://openlibrary.org/isbn/9784426126124',
  },
  {
    yearRead: 2022,
    title: '嫌われる勇気',
    url: 'https://www.hanmoto.com/bd/isbn/9784478025819',
  },
  {
    yearRead: 2022,
    title: '学び効率が最大化するインプット大全',
    url: 'https://openlibrary.org/isbn/9784801400696',
  },
  {
    yearRead: 2022,
    title: '１％の努力',
    url: 'https://openlibrary.org/isbn/9784478108499',
  },
  {
    yearRead: 2022,
    title: 'キャリアロジック 誰でも年収1000万円を超えるための28のルール',
    url: 'https://openlibrary.org/isbn/9784408339313',
  },
  {
    yearRead: 2022,
    title: '転職2.0　日本人のキャリアの新・ルール',
    url: 'https://www.sbcr.jp/product/4815608033/',
  },
  {
    yearRead: 2022,
    title: 'となりの億り人 サラリーマンでも「資産1億円」',
    url: 'https://www.books.or.jp/book-details/9784022951564',
  },
  {
    yearRead: 2022,
    title: 'System Design Interview - An Insider\'s Guide: Volume 2',
    url: 'https://openlibrary.org/isbn/9781736049112',
  },
  {
    yearRead: 2022,
    title: 'Algorithms',
    url: 'https://openlibrary.org/isbn/9780321573513',
  },
  {
    yearRead: 2022,
    title: 'System Design Interview - An insider\'s guide',
    url: 'https://bytebytego.com/courses/system-design-interview',
  },
  {
    yearRead: 2022,
    title: 'Designing Distributed Systems: Patterns and Paradigms for Scalable, Reliable Services',
    url: 'https://openlibrary.org/isbn/9781491983645',
  },
  {
    yearRead: 2021,
    title: 'Kubernetes in Action: Deploying and managing containers and cloud-native applications',
    url: 'https://openlibrary.org/isbn/9781617293726',
  },
  {
    yearRead: 2021,
    title: '学びを結果に変えるアウトプット大全',
    url: 'https://www.sanctuarybooks.jp/book-details/book1051.html',
  },
  {
    yearRead: 2021,
    title: 'Terraform: Up & Running: Writing Infrastructure as Code',
    url: 'https://openlibrary.org/isbn/9781492046905',
  },
  {
    yearRead: 2021,
    title: 'Tribal Leadership: Leveraging Natural Groups to Build a Thriving Organization',
    url: 'https://openlibrary.org/isbn/9780061251306',
  },
  {
    yearRead: 2021,
    title: 'Beyond The Phoenix Project: The Origins and Evolution Of DevOps',
    url: 'https://openlibrary.org/isbn/9781942788263',
  },
  {
    yearRead: 2021,
    title: 'Lean Enterprise: How High Performance Organizations Innovate at Scale',
    url: 'https://openlibrary.org/isbn/9781449368425',
  },
  {
    yearRead: 2021,
    title: 'Managing Humans: Biting and Humorous Tales of a Software Engineering Manager',
    url: 'https://openlibrary.org/isbn/9781484221570',
  },
  {
    yearRead: 2021,
    title: 'Running Lean: Iterate from Plan A to a Plan That Works',
    url: 'https://openlibrary.org/isbn/9781449305178',
  },
  {
    yearRead: 2021,
    title: 'Staff Engineer: Leadership Beyond the Management Track',
    url: 'https://staffeng.com/book',
  },
  {
    yearRead: 2021,
    title: 'Cloud Native Patterns: Designing change-tolerant software',
    url: 'https://openlibrary.org/isbn/9781617294297',
  },
  {
    yearRead: 2021,
    title: 'Fundamentals of Software Architecture: An Engineering Approach',
    url: 'https://openlibrary.org/isbn/9781492043454',
  },
  {
    yearRead: 2021,
    title: 'Accelerate: Building and Scaling High Performing Technology Organizations',
    url: 'https://openlibrary.org/isbn/9781942788331',
  },
  {
    yearRead: 2021,
    title: 'Lean UX: Applying Lean Principles to Improve User Experience',
    url: 'https://openlibrary.org/isbn/9781449311650',
  },
  {
    yearRead: 2021,
    title: 'Designing Data-Intensive Applications',
    url: 'https://openlibrary.org/isbn/9781449373320',
  },
  {
    yearRead: 2021,
    title: 'The Four: The Hidden DNA of Amazon, Apple, Facebook, and Google',
    url: 'https://openlibrary.org/isbn/9780735213654',
  },
  {
    yearRead: 2021,
    title: 'Range: Why Generalists Triumph in a Specialized World',
    url: 'https://openlibrary.org/isbn/9780735214484',
  },
  {
    yearRead: 2021,
    title: 'Software Engineering at Google: Lessons Learned from Programming Over Time',
    url: 'https://openlibrary.org/isbn/9781492082798',
  },
  {
    yearRead: 2021,
    title: 'The Product Book: How to Become a Great Product Manager',
    url: 'https://openlibrary.org/isbn/9780998973838',
  },
  {
    yearRead: 2021,
    title: 'gRPC: Up and Running: Building Cloud Native Applications with Go and Java for Docker and Kubernetes',
    url: 'https://openlibrary.org/isbn/9781492058335',
  },
  {
    yearRead: 2020,
    title: 'Monolith to Microservices: Evolutionary Patterns to Transform Your Monolith',
    url: 'https://openlibrary.org/isbn/9781492047841',
  },
  {
    yearRead: 2020,
    title: 'The Unicorn Project',
    url: 'https://openlibrary.org/isbn/9781942788768',
  },
  {
    yearRead: 2020,
    title: 'iOS Unit Testing by Example',
    url: 'https://openlibrary.org/isbn/9781680506815',
  },
  {
    yearRead: 2020,
    title: 'Team Topologies: Organizing Business and Technology Teams for Fast Flow',
    url: 'https://openlibrary.org/isbn/9781942788829',
  },
  {
    yearRead: 2020,
    title: 'The Pragmatic Programmer: From Journeyman to Master',
    url: 'https://openlibrary.org/isbn/9780201616224',
  },
  {
    yearRead: 2020,
    title: 'Emotional Intelligence 2.0',
    url: 'https://openlibrary.org/isbn/9780974320625',
  },
  {
    yearRead: 2020,
    title: 'The Five Dysfunctions of a Team',
    url: 'https://openlibrary.org/isbn/9780787960759',
  },
  {
    yearRead: 2020,
    title: 'Extreme Programming Explained: Embrace Change',
    url: 'https://openlibrary.org/isbn/9780321278654',
  },
  {
    yearRead: 2019,
    title: 'Effective DevOps: Building a Culture of Collaboration, Affinity, and Tooling at Scale',
    url: 'https://openlibrary.org/isbn/9781491926307',
  },
  {
    yearRead: 2019,
    title: '一番やさしい！　一番くわしい！ 個人型確定拠出年金ｉＤｅＣｏ（イデコ）活用入門',
    url: 'https://openlibrary.org/isbn/9784478100578',
  },
  {
    yearRead: 2019,
    title: 'The Dip: A Little Book That Teaches You When to Quit',
    url: 'https://openlibrary.org/isbn/9781591841661',
  },
  {
    yearRead: 2019,
    title: 'Rework',
    url: 'https://openlibrary.org/isbn/9780307463746',
  },
  {
    yearRead: 2019,
    title: 'The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win',
    url: 'https://openlibrary.org/isbn/9780988262591',
  },
  {
    yearRead: 2019,
    title: 'Refactoring: Improving the Design of Existing Code',
    url: 'https://openlibrary.org/isbn/9780134757681',
  },
  {
    yearRead: 2019,
    title: 'The Upstarts: How Uber, Airbnb, and the Killer Companies of the New Silicon Valley Are Changing the World',
    url: 'https://openlibrary.org/isbn/9780593076354',
  },
  {
    yearRead: 2019,
    title: 'Crushing It!: How Great Entrepreneurs Build Their Business and Influence and How You Can Too',
    url: 'https://openlibrary.org/isbn/9780062674678',
  },
  {
    yearRead: 2019,
    title: 'Zero To One',
    url: 'https://openlibrary.org/isbn/9780753555200',
  },
  {
    yearRead: 2019,
    title: 'Powerful: Building a Culture of Freedom and Responsibility',
    url: 'https://openlibrary.org/isbn/9781939714091',
  },
  {
    yearRead: 2019,
    title: 'The Trusted Advisor',
    url: 'https://www.simonandschuster.com/books/The-Trusted-Advisor/David-H-Maister/9781982157104',
  },
  {
    yearRead: 2019,
    title: 'Soft Skills: The Software Developer\'s Life Manual',
    url: 'https://openlibrary.org/isbn/9781617292392',
  },
  {
    yearRead: 2019,
    title: 'Radical Candor: Be a Kickass Boss Without Losing Your Humanity',
    url: 'https://openlibrary.org/isbn/9781250103505',
  },
  {
    yearRead: 2019,
    title: 'A Whole New Mind: Why Right-Brainers Will Rule the Future',
    url: 'https://openlibrary.org/isbn/9781594481710',
  },
  {
    yearRead: 2019,
    title: 'Atomic Habits',
    url: 'https://jamesclear.com/atomic-habits',
  },
  {
    yearRead: 2019,
    title: 'Drive: The Surprising Truth About What Motivates Us',
    url: 'https://openlibrary.org/isbn/9781594488849',
  },
  {
    yearRead: 2019,
    title: 'Kanban: Successful Evolutionary Change for Your Technology Business',
    url: 'https://openlibrary.org/isbn/9780984521401',
  },
  {
    yearRead: 2019,
    title: 'Functional Reactive Programming',
    url: 'https://www.manning.com/books/functional-reactive-programming',
  },
  {
    yearRead: 2019,
    title: 'The Go Programming Language',
    url: 'https://openlibrary.org/isbn/9780134190563',
  },
  {
    yearRead: 2019,
    title: 'Infrastructure as Code: Managing Servers in the Cloud',
    url: 'https://openlibrary.org/isbn/9781491924358',
  },
  {
    yearRead: 2019,
    title: 'A Philosophy of Software Design',
    url: 'https://web.stanford.edu/~ouster/cgi-bin/book.php',
  },
  {
    yearRead: 2019,
    title: 'Concurrency in Go: Tools and Techniques for Developers',
    url: 'https://openlibrary.org/isbn/9781491941195',
  },
  {
    yearRead: 2018,
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    url: 'https://openlibrary.org/isbn/9780132350884',
  },
  {
    yearRead: 2018,
    title: 'Radical Focus',
    url: 'https://www.radicalfocus.com/',
  },
  {
    yearRead: 2018,
    title: 'The Lean Startup',
    url: 'https://openlibrary.org/isbn/9780307887894',
  },
  {
    yearRead: 2018,
    title: 'The Culture Map: Decoding How People Think, Lead, and Get Things Done Across Cultures',
    url: 'https://openlibrary.org/isbn/9781610392761',
  },
  {
    yearRead: 2018,
    title: 'The Manager\'s Path: A Guide for Tech Leaders Navigating Growth and Change',
    url: 'https://openlibrary.org/isbn/9781491973899',
  },
  {
    yearRead: 2018,
    title: 'Metaprogramming Ruby 2: Program Like the Ruby Pros',
    url: 'https://openlibrary.org/isbn/9781941222126',
  },
  {
    yearRead: 2018,
    title: 'iOS Apprentice: Beginning iOS development with Swift 4',
    url: 'https://openlibrary.org/isbn/9781942878391',
  },
  {
    yearRead: 2018,
    title: 'RxSwift: Reactive Programming with Swift',
    url: 'https://www.kodeco.com/books/rxswift-reactive-programming-with-swift',
  },
  {
    yearRead: 2018,
    title: 'Building Microservices with Go',
    url: 'https://openlibrary.org/isbn/9781786468666',
  },
  {
    yearRead: 2018,
    title: 'Joel on Software',
    url: 'https://openlibrary.org/isbn/9781590593899',
  },
  {
    yearRead: 2018,
    title: 'iOS Animations by Tutorials',
    url: 'https://openlibrary.org/isbn/9781942878407',
  },
  {
    yearRead: 2018,
    title: 'Never Split the Difference',
    url: 'https://www.blackswanltd.com/never-split-the-difference',
  },
  {
    yearRead: 2017,
    title: '学年ビリのギャルが1年で偏差値を40上げて慶應大学に現役合格した話',
    url: 'https://openlibrary.org/isbn/9784048650953',
  },
  {
    yearRead: 2010,
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    url: 'https://openlibrary.org/isbn/9780201633610',
  },
  {
    yearRead: 2010,
    title: 'The C Programming Language',
    url: 'https://openlibrary.org/isbn/9780131103627',
  },
]

const years = books.reduce<Book['yearRead'][]>((result, book) => {
  if (!result.includes(book.yearRead)) {
    result.push(book.yearRead)
  }

  return result
}, [])

const Page = () => (
  <>
    <Head>
      <title>Anton Van Eechaute :: Books</title>
    </Head>
    <Header />
    <h1 className="title mb-3">Books</h1>
    <p className="mb-3 text-neutral-700">
      A reading log of books that have helped shape how I think about building
      software, running teams, career, and personal finance. I mostly read in
      English, with some Japanese mixed in.
    </p>
    <p className="mb-8 text-neutral-700">
      This page is limited to non-fiction. Most of the fiction I read is in
      Japanese, and I track that separately on{' '}
      <Link href="https://bookmeter.com/users/445442/books/read">Bookmeter</Link>
      .
    </p>
    <div className="space-y-10">
      {years.map(year => (
        <section key={year}>
          <h2 className="subtitle mb-3">{year}</h2>
          <ul className="list-disc pl-6 space-y-2">
            {books
              .filter(book => book.yearRead === year)
              .map(book => (
                <li key={`${year}-${book.title}`} className="leading-relaxed">
                  <Link
                    href={book.url}
                    className="text-neutral-800 hover:text-primary"
                  >
                    {book.title}
                  </Link>
                  {book.reviewUrl ? (
                    <>
                      {' '}
                      <span className="text-neutral-400">/</span>{' '}
                      <Link href={book.reviewUrl} className="fancy text-sm">
                        Review
                      </Link>
                    </>
                  ) : null}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  </>
)

export default Page
