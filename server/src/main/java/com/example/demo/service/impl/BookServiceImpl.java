@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    // @Autowired
    // private BookEventPublisher eventPublisher;

    @Override
    @Cacheable(value = "books", key = "'allBooks'")
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    @CacheEvict(value = "books", key = "'allBooks'")
    public Book saveBook(Book book) {
        Book savedBook = bookRepository.save(book);
        // eventPublisher.publishBookCreated(savedBook);
        return savedBook;
    }

    @Override
    @CacheEvict(value = "books", key = "'allBooks'")
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public List<Book> getBooksRead(int progress) {
        return bookRepository.findByProgressGreaterThan(progress);
    }
}
