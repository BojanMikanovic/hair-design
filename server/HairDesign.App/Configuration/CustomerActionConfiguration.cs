using HairDesign.App.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HairDesign.App.Configuration
{
    public class CustomerActionConfiguration : IEntityTypeConfiguration<CustomerAction>
    {
        public void Configure(EntityTypeBuilder<CustomerAction> builder)
        {
            builder.ToTable("CustomerAction");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Note)
                .HasMaxLength(2000);

            builder.Property(x => x.ColorNote)
                .HasMaxLength(200);

            builder.Property(x => x.Price)
                .HasPrecision(18, 2);

            builder.Property(x => x.Date)
                .IsRequired();

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.HasOne(x => x.Customer)
                .WithMany(x => x.Actions)
                .HasForeignKey(x => x.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Service)
                .WithMany(x => x.CustomerActions)
                .HasForeignKey(x => x.ServiceId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}